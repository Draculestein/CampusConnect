from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Organization(models.Model):
    States_choices = [
        ("AL", "ALABAMA"),
        ("AK", "ALASKA"),
        ("AS", "AMERICAN SAMOA"),
        ("AZ", "ARIZONA"),
        ("AR", "ARKANSAS"),
        ("CA", "CALIFORNIA"),
        ("CO", "COLORADO"),
        ("CT", "CONNECTICUT"),
        ("DE", "DELAWARE"),
        ("DC", "DISTRICT OF COLUMBIA"),
        ("FL", "FLORIDA"),
        ("GA", "GEORGIA"),
        ("GU", "GUAM"),
        ("HI", "HAWAII"),
        ("ID", "IDAHO"),
        ("IL", "ILLINOIS"),
        ("IN", "INDIANA"),
        ("IA", "IOWA"),
        ("KS", "KANSAS"),
        ("KY", "KENTUCKY"),
        ("LA", "LOUISIANA"),
        ("ME", "MAINE"),
        ("MD", "MARYLAND"),
        ("MA", "MASSACHUSETTS"),
        ("MI", "MICHIGAN"),
        ("MN", "MINNESOTA"),
        ("MS", "MISSISSIPPI"),
        ("MO", "MISSOURI"),
        ("MT", "MONTANA"),
        ("NE", "NEBRASKA"),
        ("NV", "NEVADA"),
        ("NH", "NEW HAMPSHIRE"),
        ("NJ", "NEW JERSEY"),
        ("NM", "NEW MEXICO"),
        ("NY", "NEW YORK"),
        ("NC", "NORTH CAROLINA"),
        ("ND", "NORTH DAKOTA"),
        ("MP", "NORTHERN MARIANA IS"),
        ("OH", "OHIO"),
        ("OK", "OKLAHOMA"),
        ("OR", "OREGON"),
        ("PA", "PENNSYLVANIA"),
        ("PR", "PUERTO RICO"),
        ("RI", "RHODE ISLAND"),
        ("SC", "SOUTH CAROLINA"),
        ("SD", "SOUTH DAKOTA"),
        ("TN", "TENNESSEE"),
        ("TX", "TEXAS"),
        ("UT", "UTAH"),
        ("VT", "VERMONT"),
        ("VA", "VIRGINIA"),
        ("VI", "VIRGIN ISLANDS"),
        ("WA", "WASHINGTON"),
        ("WV", "WEST VIRGINIA"),
        ("WI", "WISCONSIN"),
        ("WY", "WYOMING"),
    ]

    ope8id = models.CharField(
        verbose_name="OPE8",
        max_length=8,
        validators=[
            RegexValidator(
                regex="\w{8}$", message="Has to be 8 digits", code="ope8id_no_match"
            )
        ],
    )
    ope6id = models.CharField(
        verbose_name="OPE6",
        max_length=6,
        validators=[
            RegexValidator(
                regex="\w{6}$", message="Has to be 6 digits", code="ope6id_no_match"
            )
        ],
    )
    name = models.CharField(verbose_name="Organization Name", max_length=200)
    address = models.TextField(verbose_name="Address")
    city = models.CharField(verbose_name="City", max_length=80)
    state = models.CharField(max_length=2, choices=States_choices)
    postal_code = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                regex="^\d{5}(?:[-\s]\d{4})?$",
                message="Invalid postal code",
                code="postalcode_no_match",
            )
        ],
    )
    url = models.URLField(verbose_name="Homepage URL")
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
    ope6id = models.CharField(
        verbose_name="OPE6",
        max_length=6,
        validators=[
            RegexValidator(
                regex="\w{6}$", message="Has to be 6 digits", code="ope6id_no_match"
            )
        ],
    )
    cip = models.CharField(max_length=4)
    name = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.name


class Demography(models.Model):
    pass


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dob = models.DateTimeField(auto_now_add=True)
    grad_date = models.DateTimeField(auto_now_add=True)
    nationality = models.CharField(max_length=12)
    race = models.CharField(max_length=10)
    organization = models.ForeignKey(Organization, null=True, on_delete=models.DO_NOTHING)


# Signals
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
