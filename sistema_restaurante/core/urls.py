from django.urls import path
from .import views

core_patterns = ([    
    path('',views.HomePageView.as_view(), name = 'home'),
    path('desk-list/',views.DeskListView.as_view(), name = 'desk_list'),
    path('add-order/',views.AddOrderView.as_view(), name = 'add_order'),

],'core')
