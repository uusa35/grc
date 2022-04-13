import time
from locust import HttpUser, task
import urllib3

# surpress verify warnings from urllib
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get('', verify=True, cert=('my.crt', 'my.key'))
        self.client.get("/")
        self.client.get("/aboutus")

