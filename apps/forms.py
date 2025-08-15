from django.contrib.auth.models import User
from django.forms.models import ModelForm


class UserRegisterForm(ModelForm):
    class Meta:
        model = User
        fields = 'username', 'last_name', 'first_name', 'password', 'email'