from celery import shared_task,task
from time import sleep
from datetime import datetime
import math
from functools import reduce
import numpy as np
from scipy.spatial.distance import cdist, euclidean
from pyproj import Proj, transform
from subscribers.models import Location, Subscriber
@shared_task
def sleep_echo():
    print("hellooooo")
@task(name='subscribers.tasks.send_notifiction')
@shared_task 
def send_notifiction():
    #Location.objects.create("denemee", "denemee")
    l = Location(taskid="randimasdasd", status="succes",timestamp=datetime.now())
    l.save()
    
    print("Here m")
     # Another trick
def geometric_median(coordinates, eps=1e-5):
    y = np.mean(coordinates, 0)

    while True:
        D = cdist(coordinates, [y])
        nonzeros = (D != 0)[:, 0]

        Dinv = 1 / D[nonzeros]
        Dinvs = np.sum(Dinv)
        W = Dinv / Dinvs
        T = np.sum(W * coordinates[nonzeros], 0)

        num_zeros = len(coordinates) - np.sum(nonzeros)
        if num_zeros == 0:
            y1 = T
        elif num_zeros == len(coordinates):
            return y
        else:
            R = (T - y) * Dinvs
            r = np.linalg.norm(R)
            rinv = 0 if r == 0 else num_zeros/r
            y1 = max(0, 1-rinv)*T + min(1, rinv)*y

        if euclidean(y, y1) < eps:
            return y1

        y = y1
  

def equidistance(coordinates):
	return reduce(lambda first, second: first + second, coordinates) / len(coordinates)


def get_latitude_longitude(point):
	r = 6371000.0
	lat = (math.asin(point[2] / r))*(180/math.pi)
	lon = (math.atan2(point[1] , point[0]))*(180/math.pi)
	return [lat, lon]

def get_x_y(lat_lon_array):
	i = 0
	r = 6371000.0
	result = []
	while i < len(lat_lon_array):
		x = r * math.cos((lat_lon_array[i][0]*math.pi)/180) * math.cos((lat_lon_array[i][1]*math.pi)/180)
		y = r * math.cos((lat_lon_array[i][0]*math.pi)/180) * math.sin((lat_lon_array[i][1]*math.pi)/180)
		z = r * math.sin((lat_lon_array[i][0]*math.pi)/180)
		result.append([x,y,z])
		i = i + 1
	return result

def get_coordinates(queryset):
    i = 0
    result = []
    while i < len(queryset):
        lat = queryset[i].latitude
        lon = queryset[i].longitude
        result.append([lat,lon])
        i = i + 1
    return result
    
def model(eta_dbm, referenceDistance, f, Gt, Gr, Pt, Pr):
	nert = 2*math.pow((10/math.log(10, math.exp(1))),2)
	ref = 20*math.log(referenceDistance, 10)+20*math.log(f, 10)+20*math.log(((4*math.pi)/(300*(math.pow(10,6)))), 10)-Gr-Gt
	est = math.pow(10,((-Pr+Pt+ref)/(10*eta_dbm)))*math.exp(-1*math.pow(12,2)/(nert*math.pow(eta_dbm,2)))
	return est
def get_radius(center, points):
	radius = 0
	for point in points:
		a = np.array([center[0], center[1]])
		b = np.array([point[0], point[1]])
		distance = np.linalg.norm(a-b)
		if(distance > radius):
			radius = distance
	return radius

def create_y_coordinate(center,distance,x_coordinate):
	return center[1] + math.sqrt(abs(math.pow(distance, 2) - (math.pow((x_coordinate - center[0]), 2))))

def create_possible_points(center, radius):
	result = []
	inside_loop = math.floor(500)
	array = np.random.uniform(0,radius,[math.floor(500)])
	for distance in array:
		for i in range(inside_loop):
			x_coordinate = (np.random.uniform(-1*distance, distance, [1]))[0] + center[0]
			y_coordinate = create_y_coordinate(center, distance, x_coordinate)
			result.append([x_coordinate, y_coordinate])
	return result

def calculate_error_distance(possible_point, subscriber_point, estimate_distance):
	distance = get_radius(possible_point, [subscriber_point])
	return pow((estimate_distance-distance), 2)

def estimate_point(subscriber_distances, subscriber_locations):
	optimal_error = 10000
	estimate_point_index = 0
	center_point = geometric_median(np.array(subscriber_locations), eps=1e-5)
	radius = get_radius(center_point, subscriber_locations)
	possible_points = create_possible_points(center_point, radius)
	index_pp = 0
	for possible_point in possible_points:
		point_error = 0
		index_sp = 0
		for subscriber_point in subscriber_locations:
			error = calculate_error_distance(possible_point, subscriber_point, subscriber_distances[index_sp])
			index_sp = index_sp + 1
			point_error = point_error + error
		if(point_error < optimal_error):
			optimal_error = point_error
			estimate_point_index = index_pp
		index_pp = index_pp + 1
	return [possible_points[estimate_point_index][0], possible_points[estimate_point_index][1], center_point[2]]

def calculate_distances(Prs):
	result = []
	for Pr in Prs:
		distance = model(5.5, 1, 2685000000, 80, 40, 7, Pr)
		result.append(distance)
	return result

#srsLTE position estimation.
#Prs: Signal Powers of subscribers in order
#subscriber_locations: pair of latitude and longitude for each subscriber in order
@task(name='subscribers.tasks.estimate_localization')
@shared_task
#def estimate_localization(Prs, subscriber_locations):
def estimate_localization():
    subs = Subscriber.objects.exclude(username = "robot").exclude(username="target")
    signals = []
    coordinates = []
    for sub in subs:
        coordinates.append([sub.latitude,sub.longitude])
        signals.append(sub.signalpower)
    a = np.array(get_x_y(coordinates))
    robot_loc = get_latitude_longitude(estimate_point(calculate_distances(signals), get_x_y(coordinates)))
    Subscriber.objects.filter(username="robot").update(latitude=robot_loc[0],longitude=robot_loc[1])
#suggestion for srsLTE position (only distance based)
#mode: there are two option, prefer number 1
#coordinates: pair of latitude and longitude for each subscriber in order
@task(name='subscribers.tasks.calculate')
@shared_task
#def calculate(mode, coordinates):
def calculate():
    subs = Subscriber.objects.exclude(username = "robot").exclude(username="target")
    coordinates = []
    for sub in subs:
        coordinates.append([sub.latitude,sub.longitude])
    a = np.array(get_x_y(coordinates))
    mode = 1
    target_loc = []
    if mode == 1:
        target_loc =  get_latitude_longitude(geometric_median(a, eps=1e-5))
    elif mode == 2:
        target_loc = get_latitude_longitude(equidistance(a))
    Subscriber.objects.filter(username="target").update(latitude=target_loc[0],longitude=target_loc[1])
