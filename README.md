# VERITY - IMPROVED Bridge

Public normal-world bridge. Each user opens the web page, pastes their own Groq API key, and receives a private Minecraft `/connect` command.

## Best Host

Use Railway first. Render also works. Vercel is not recommended for persistent WebSockets.

## User Flow

1. User opens your bridge website.
2. User chooses language.
3. User pastes their own Groq API key.
4. Website creates a private session.
5. Website shows:

```text
/connect wss://YOUR-DOMAIN/ws/SESSION_ID
```

6. User runs that command in a normal Minecraft Bedrock world with cheats enabled.

## Scaling

- Sessions are isolated by `SESSION_ID`.
- Histories are isolated per session and player.
- Each session uses that user's own Groq key.
- Per-player cooldown prevents spam.
- Per-session queue prevents request bursts.
- Sessions expire automatically.

## Optional Environment Variables

```text
GROQ_MODEL=llama-3.1-8b-instant
SESSION_TTL_MS=86400000
PLAYER_COOLDOWN_MS=2200
MAX_ACTIVE_PER_SESSION=2
MAX_QUEUE_PER_SESSION=24
MAX_SESSIONS=5000
```

## Addon Channel

The bridge sends actions back to the addon with:

```text
scriptevent pntmc:verity_bridge "{...}"
```

The addon prints:

```text
§e§lVERITY§r : message
```
