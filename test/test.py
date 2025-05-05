from locust import HttpUser, task
import random
import string

def random_string(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class APITestUser(HttpUser):
    wait_time = lambda self: 0  # No wait time between tasks

    @task(1)
    def post_add(self):
        key = "007Xlx73"
        value = {"data": random_string(20)}
        response = self.client.post(
            "/add",
            json={"key": key, "value": value},
            headers={"Content-Type": "application/json"},
        )
        if response.status_code != 200:
            print(f"POST failed for key={key}")

        # Save the key to use in get request
        self.last_key = key

    @task(2)
    def get_item(self):
        key = getattr(self, "last_key", random_string())
        self.client.get(f"/get/007Xlx73")
