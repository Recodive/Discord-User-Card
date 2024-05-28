import { mapDiscordApiUser } from "@discord-user-card/core";

// eslint-disable-next-line unicorn/no-null
console.log("hi", mapDiscordApiUser({ avatar: null, discriminator: "0", global_name: null, id: "123", username: "test" }));
