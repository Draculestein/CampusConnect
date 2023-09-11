from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Organization(models.Model):
    States_choices = [  
('ALABAMA'     	       ,'AL'),
('ALASKA'      	       ,'AK'),
('AMERICAN SAMOA'	       ,'AS'),
('ARIZONA'	           ,'AZ'),
('ARKANSAS'	           ,'AR'),
('CALIFORNIA'	           ,'CA'),
('COLORADO'	           ,'CO'),
('CONNECTICUT'	       ,'CT'),
('DELAWARE'	           ,'DE'),
('DISTRICT OF COLUMBIA'   ,'DC'),
('FLORIDA'	           ,'FL'),
('GEORGIA'	           ,'GA'),
('GUAM'	               ,'GU'),
('HAWAII'	               ,'HI'),
('IDAHO'	               ,'ID'),
('ILLINOIS'	           ,'IL'),
('INDIANA'	           ,'IN'),
('IOWA'	               ,'IA'),
('KANSAS'	               ,'KS'),
('KENTUCKY'	           ,'KY'),
('LOUISIANA'	           ,'LA'),
('MAINE'	               ,'ME'),
('MARYLAND'	           ,'MD'),
('MASSACHUSETTS'	       ,'MA'),
('MICHIGAN'	           ,'MI'),
('MINNESOTA'	           ,'MN'),
('MISSISSIPPI'	       ,'MS'),
('MISSOURI'	           ,'MO'),
('MONTANA'	           ,'MT'),
('NEBRASKA'	           ,'NE'),
('NEVADA'	               ,'NV'),
('NEW HAMPSHIRE'	       ,'NH'),
('NEW JERSEY'	           ,'NJ'),
('NEW MEXICO'	           ,'NM'),
('NEW YORK'	           ,'NY'),
('NORTH CAROLINA'	       ,'NC'),
('NORTH DAKOTA'	       ,'ND'),
('NORTHERN MARIANA IS'	,'MP'),
('OHIO'	               ,'OH'),
('OKLAHOMA'	           ,'OK'),
('OREGON'	               ,'OR'),
('PENNSYLVANIA'	       ,'PA'),
('PUERTO RICO'	       ,'PR'),
('RHODE ISLAND'	       ,'RI'),
('SOUTH CAROLINA'	       ,'SC'),
('SOUTH DAKOTA'	       ,'SD'),
('TENNESSEE'	           ,'TN'),
('TEXAS'	               ,'TX'),
('UTAH'	               ,'UT'),
('VERMONT'	           ,'VT'),
('VIRGINIA'	           ,'VA'),
('VIRGIN ISLANDS'	       ,'VI'),
('WASHINGTON'	           ,'WA'),
('WEST VIRGINIA'	       ,'WV'),
('WISCONSIN'	           ,'WI'),
('WYOMING'	           ,'WY')]
    ope8id = models.CharField(verbose_name='OPE8', validators=[RegexValidator(regex='\w{8}$', message='Has to be 8 digits', code='ope8id_no_match')])
    ope6id = models.CharField(verbose_name='OPE6', validators=[RegexValidator(regex='\w{6}$', message='Has to be 6 digits', code='ope6id_no_match')])
    name = models.CharField(verbose_name='Organization Name', max_length=200)
    address = models.TextField(verbose_name='Address')
    city = models.CharField(verbose_name='City', max_length=80)
    state = models.CharField(max_length=2, choices=States_choices)
    postal_code = models.CharField(validators=[RegexValidator(regex='^\d{5}(?:[-\s]\d{4})?$', message='Invalid postal code', code='postalcode_no_match')])
    url = models.URLField(verbose_name='Homepage URL')
    admission_rate = models.DecimalField(max_digits=3, decimal_places=2)
    average_sat = models.FloatField()
    test_score = models.FloatField()
    number_of_nra = models.PositiveIntegerField()
    avg_cost_attendance = models.FloatField()
    out_of_state_tuition = models.FloatField()
    books_and_supplies = models.FloatField()
    on_campus_exp = models.FloatField()
    off_campus_exp = models.FloatField()
    with_fam_exp = models.FloatField()
    ratio_undergrad_faculty = models.DecimalField(max_digits=3, decimal_places=2)
    lowest_temp = models.FloatField()
    highest_temp = models.FloatField()
    num_users_enrolled = models.PositiveIntegerField()
    num_users_transferred = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class Programs(models.Model):
    ope6id = models.CharField(verbose_name='OPE6', validators=[RegexValidator(regex='\w{6}$', message='Has to be 6 digits', code='ope6id_no_match')])
    cip = models.CharField(max_length=4)
    name = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.name