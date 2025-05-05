from locust import User, HttpUser, task, events
from websocket import create_connection
import threading
import json
import time
import random

WS_URL = "ws://localhost:5000/ws"
TEST_SYMBOLS = ["xau/usd"]

# class WebSocketUser(User):
#     def on_start(self):
#         try:
#             self.symbol_code = random.choice(TEST_SYMBOLS)
#             self.ws = create_connection(f"{WS_URL}?symbolCode={self.symbol_code}")
#             print(f"[Connected] symbolCode={self.symbol_code}")
#         except Exception as e:
#             print("[ERROR] Connection failed:", e)

#     def on_stop(self):
#         if hasattr(self, "ws"):
#             self.ws.close()
#             print("[Disconnected]")

#     @task
#     def subscribe_price(self):
#         # Gửi request subscribePrice
#         subscribe_message = json.dumps({
#             "type": "subscribePrice"
#         })
#         self.ws.send(subscribe_message)

#         start_time = time.time()
#         response = self.ws.recv()
#         response_time = int((time.time() - start_time) * 1000)  # ms

#         data = json.loads(response)
#         if data.get("type") == "currentPrice":
#             events.request_success.fire(
#                 request_type="websocket",
#                 name="subscribePrice",
#                 response_time=response_time,
#                 response_length=len(response),
#             )
#         else:
#             raise ValueError("Unexpected message")

     
class PriceUpdateUser(HttpUser):


    # @task
    # def update_price(self):
    #     new_price = round(random.uniform(10, 1000), 2)
    #     response = self.client.patch(
    #         f"/v1/symbol/6818d424f219716c083d4d18/price",
    #         json={"newPrice": new_price},
    #         headers={"Content-Type": "application/json"}
    #     )
    #     if response.status_code != 200:
    #         print(f"POST failed for key=6818d424f219716c083d4d18")
    @task(1)
    def get_item(self):
        self.client.get(f"/v1/symbol/6818d424f219716c083d4d18")
