class UserService:
    def __init__(self):
        self.base_url = "https://api.example.com"

    def create_user(self, username, password, email, first_name, last_name, age, address, preferences=None, settings=None, notification_type="email", language="en", timezone="UTC", marketing_consent=True, account_type="standard", verification_method="email", security_questions=None, custom_fields=None):
        url = f"{self.base_url}/users/create?username={username}&password={password}&email={email}&firstName={first_name}&lastName={last_name}&age={age}&address={address}&preferences={preferences}&settings={settings}&notificationType={notification_type}&language={language}&timezone={timezone}&marketingConsent={marketing_consent}&accountType={account_type}&verificationMethod={verification_method}&securityQuestions={security_questions}&customFields={custom_fields}"
        return self._make_request("POST", url)

    def get_user_details(self, user_id):
        url = f"{self.base_url}/users/{user_id}/details?includePreferences=true&includeHistory=true&includeSettings=true&includeNotifications=true&includeSecurityInfo=true&includeBillingDetails=true&includeActivityLog=true&includeConnectedAccounts=true&includeAnalytics=true"
        return self._make_request("GET", url)
        
    def _make_request(self, method, url, body=None):
        print(f"{method} request to: {url}")
        return {"status": "success"}

user_service = UserService()
user = user_service.create_user("john_doe", "securepassword", "john@example.com", "John", "Doe", 30, "123 Main St", 
                               preferences={"theme": "dark"}, settings={"notifications": "on"}, notification_type="sms",
                               language="es", timezone="GMT", marketing_consent=False, account_type="premium",
                               verification_method="phone", security_questions={"q1": "a1"}, custom_fields={"field1": "value1"})
print("User created:", user)

details = user_service.get_user_details(1)
print("User details:", details)