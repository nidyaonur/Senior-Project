from rest_framework.permissions import BasePermission, SAFE_METHODS



class IsOwnerOrReadOnlyOrAdmin(BasePermission):
    message = 'You are not the subscriber that you want to change!'
    my_safe_method = ['PUT','GET']
    def has_permission(self, request, view):
        if request.method in self.my_safe_method:
            return True
        return False

    def has_object_permission(self,request, view,obj):

        if request.method in SAFE_METHODS:
            return True
        if request.user.is_superuser:
            return True
        return obj.user == request.user
