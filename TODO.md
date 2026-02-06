# TODO: Fix User Data Insertion on Login

## Completed Tasks
- [x] Create API route `/api/user` to fetch or create user in DB using Clerk ID
- [x] Modify `fetchUserData` in `AppContext.jsx` to call the API instead of using dummy data
- [x] Update cartItems from user data in DB

## Summary
The issue was that user information wasn't being inserted into the database on login because:
- The app relied on Inngest webhooks for user creation, which may not be configured or triggered for existing users.
- AppContext used dummy data instead of real DB data.

Solution implemented:
- New API route that checks if user exists in DB, creates if not (using Clerk API to get user details).
- AppContext now fetches real user data and sets cartItems from DB.

This ensures user data is inserted and retrieved correctly on login.
