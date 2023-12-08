# ngrok-example

Use [ngrok](https://ngrok.com/) to showcase some of the essential functionality for "live" API endpoint and webhook testing.

### Flow of demo:

1. Begin with a brief code overview.
2. Start the server and head to the basic "/" GET request.
3. Take a quick look at `localhost:4040` to see the inspection interface.
4. Stop the server and show scripts for authentication.
5. Comment out the ngrok connection in the `index.ts` file and restart the server.
6. Run the script for `basic-auth`. Take a look at the terminal to see requests and other details.
7. Visit the provided ngrok URL from the terminal and use the "/basic" route for a fun surprise!
8. Run the script for `oauth`. Take a look at the terminal again.
9. Visit the provided ngrok URL from the terminal and use the "/oauth" route for one more surprise! (Note: this demo was completed on a Friday ;) )
