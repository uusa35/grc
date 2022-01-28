from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get("/")
        self.client.get("/product")
        self.client.get("/book")
        self.client.get("/course")
        self.client.get("/service")
        self.client.get("/aboutus")
        self.client.get("/logging")
