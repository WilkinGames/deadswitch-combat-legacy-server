﻿/**
 * Deadswitch: Combat
 * server.js - Multiplayer Server
 * ©2021 Wilkin Games
 * https://xwilkinx.com
 */

const chalk = require("chalk");
const log = console.log;
const settings = require("./settings.json");
const MathUtil = {
    Random: function (_min, _max)
    {
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
    },
    RandomBoolean: function ()
    {
        return Math.random() >= 0.5;
    }
};
const ServerData = {
    VERSION: "1.0.0",
    GAME_VERSION: "0.0.12",
};
const LobbyState = {
    INTERMISSION: "intermission",
    WAITING_HOST: "waiting_host",
    WAITING: "waiting",
    PREPARING: "preparing",
    STARTING: "starting",
    IN_PROGRESS: "in_progress"
};
const GameMode = {
    TEAM_DEATHMATCH: "team_deathmatch",
    DOMINATION: "domination",
    CONQUEST: "conquest",
    DESTRUCTION: "destruction",
    CAPTURE_THE_FLAG: "capture_the_flag",
    SURVIVAL_SIEGE: "survival_siege",
    SURVIVAL_TERRORIST: "survival_terrorist",
    SURVIVAL_ZOMBIE: "survival_zombie"
};
const Map = {
    DOWNTURN: "map_downturn",
    OVERGROWN: "map_overgrown",
    BATTLESHIP: "map_battleship"
};
const BotSkill = {
    AUTO: -1,
    EASY: 0,
    NORMAL: 1,
    HARD: 2,
    INSANE: 3,
    GOD: 4
};
const GameServer = {
    EVENT_ERROR: 0,
    EVENT_BATCH: 1,
    EVENT_GAME_INIT: 2,
    EVENT_GAME_TIMER: 3,
    EVENT_GAME_PRE_TIMER: 4,
    EVENT_GAME_START: 5,
    EVENT_GAME_END: 6,
    EVENT_GAME_UPDATE: 7,
    EVENT_PLAYER_JOIN: 8,
    EVENT_PLAYER_LEAVE: 9,
    EVENT_PLAYER_UPDATE: 10,
    EVENT_SPAWN_CHARACTER: 11,
    EVENT_OBJECT_UPDATE: 12,
    EVENT_PLAYER_INPUT: 13,
    EVENT_PLAYER_TRIGGER_WEAPON: 14,
    EVENT_PAWN_DAMAGE: 19,
    EVENT_PAWN_DIE: 20,
    EVENT_PAWN_ACTION: 21,
    EVENT_PLAYER_MULTI_KILL: 35,
    EVENT_PLAYER_INTERACT: 38,
    EVENT_PLAYER_UPDATE_INVENTORY: 39,
    EVENT_PLAYER_TRIGGER_EQUIPMENT: 41,
    EVENT_PLAYER_TRIGGER_GRENADE: 43,
    EVENT_KILLFEED_ADD: 45,
    EVENT_MESSAGE_ADD: 46,
    EVENT_SPAWN_OBJECT: 47,
    EVENT_SPAWN_BULLET: 48,
    EVENT_SPAWN_EXPLOSION: 49,
    EVENT_GAME_PAUSE: 50,
    EVENT_REMOVE_OBJECT: 61,
    PAWN_FIRE_WEAPON: 1,
    PAWN_HIT_SHIELD: 2,
    PAWN_START_REVIVE: 3,
    PAWN_END_REVIVE: 4,
    PAWN_SHARED_CRATE: 5,
    PAWN_STOLE_CRATE: 6,
    PAWN_START_INTERACTION: 7,
    PAWN_NO_AMMO: 8,
    PAWN_OPEN_LAPTOP: 9,
    PAWN_ON_FIRE: 10,
    PAWN_STUN: 11,
    PAWN_FLASH: 12,
    PAWN_FREEZE: 13,
    PAWN_SET_JAMMED: 14,
    PAWN_UPDATE_DOOR: 15,
    PAWN_INVESTIGATE: 16,
    PAWN_TROPHY_HIT: 17,
    PAWN_START_SHIELD_COOLDOWN: 18,
    PAWN_END_SHIELD_COOLDOWN: 19,
    PAWN_END_FIRE_DELAY: 20,
    PAWN_END_BOLT_DELAY: 21,
    PAWN_END_THROW_DELAY: 22,
    PAWN_END_EQUIPMENT_DELAY: 23,
    PAWN_END_MELEE_DELAY: 24,
    PAWN_RELOAD_COMPLETE: 25,
    PAWN_CLOSE_LAPTOP: 26,
    PAWN_START_FLAME: 27,
    PAWN_END_FLAME: 28,
    PAWN_RELOAD: 29,
    PAWN_PULL_BOLT: 30,
    PAWN_CANCEL_RELOAD: 31,
    PAWN_CANCEL_BOLT_PULL: 32,
    PAWN_THROW_GRENADE: 33,
    PAWN_USE_STIM: 34,
    PAWN_RECEIVE_STIM: 35,
    PAWN_PLACE_EQUIPMENT: 36,
    PAWN_MELEE_ATTACK: 37,
    PAWN_FIRE_MELEE: 38,
    PAWN_FIRE_ROCKET: 39,
    PAWN_TRIGGER_MINE: 40,
    PAWN_END_INTERACTION: 41,
    PAWN_JUMP: 42,
    PAWN_ON_BOOST: 43,
    PAWN_START_LADDER_CLIMB: 44,
    PAWN_LEAVE_LADDER: 45,
    PAWN_DROP_CRATE: 46,
    PAWN_FLAG: 47,
    PAWN_HIT: 48,
    PAWN_VEHICLE_START: 49,
    PAWN_VEHICLE_LEAVE: 50,
    INV_CLASS_DATA: 1,
    INV_CURRENT_INVENTORY_INDEX: 2,
    INV_FIRE: 3,
    INV_PERK_ADD: 4,
    INV_PERKS: 5,
    INV_PERKS_SET: 6,
    INV_MOD_SET: 7,
    INV_EQUIPMENT_SET: 8,
    INV_EQUIPMENT_ADD: 9,
    INV_AMMO: 10,
    INV_AMMO_ADD: 11,
    INV_MAG: 12,
    INV_MAG_ADD: 13,
    INV_BURSTS: 14,
    INV_BURSTS_ADD: 15,
    INV_ITEM: 16,
    INV_ITEM_ADD: 17,
    INV_ITEM_REPLACE: 18,
    INV_INVENTORY_REPLACE: 19,
    INV_INVENTORY: 21,
    INV_EQUIPMENT: 22
};
log(chalk.bgBlue("Deadswitch: Combat | Multiplayer Server | " + ServerData.VERSION));
var serverStartTime = Date.now();
log("Started:", (new Date(serverStartTime).toString()));
log(settings, "\n");

log(chalk.yellow("Loading modules..."));
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const customParser = require("socket.io-json-parser");
const { Server } = require("socket.io");
const io = new Server(server, {
    parser: customParser,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const p2 = require("p2");
const path = require("ngraph.path");
const graph = require("ngraph.graph");
const shared = require("./assets/json/shared.json");
const sprites = require("./assets/json/sprites.json");
const weapons_world = require("./assets/images/world/atlas_weapons_world.json");
const weapons = require("./assets/json/weapons.json");
const vehicles = require("./assets/json/vehicles.json");
const mods = require("./assets/json/mods.json");
const modes = require("./assets/json/modes.json");
const maps = require("./assets/json/maps.json");
var allMaps = [];
for (var i = 0; i < maps.length; i++)
{
    let id = maps[i].id;
    try
    {
        allMaps.push(require("./assets/json/maps/" + id + ".json"));
    }
    catch (e)
    {
        console.warn("Missing map:", id);
    }
}
log("Loaded", allMaps.length, "maps");
log(chalk.green("Done"));

var stats = {
    games: 0,
    kills: 0,
    tankKills: 0,
    heliKills: 0
};
function incrementStat(_id)
{
    if (stats[_id] == null)
    {
        stats[_id] = 0;
    }
    stats[_id]++;
}

app.use(cors({
    origin: "*"
}));
app.get("/", (req, res) =>
{
    var str = "<head><style>body { font-size: 12px; font-family:'Arial'; } h1 { height: 10px; } td { text-align: center; vertical-align: middle; }</style>";
    str += "<title>[DS:C] Multiplayer Server</title></head><body><h1>Deadswitch: Combat</h1><h3>MULTIPLAYER SERVER</h3>"
    if (settings.name)
    {
        str += "<h3>" + settings.name + "</h3>";
    }
    var upTime = convertMS(Date.now() - serverStartTime);
    str += "<b>Uptime:</b> " + upTime.day + "d " + upTime.hour + "h " + upTime.minute + "m " + upTime.seconds + "s<br>";
    str += "<b>Version:</b> " + ServerData.VERSION + "<br>";
    str += "<b>Game Version:</b> " + ServerData.GAME_VERSION;
    str += "<h3>Stats</h3>";
    var keys = Object.keys(stats);
    for (var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        str += "<b>" + key + ":</b> " + stats[key];
        if (i < keys.length - 1)
        {
            str += "<br>";
        }
    }
    var lobby = lobbies[0];
    if (lobby)
    {  
        str += "<h3>Lobby</h3>"
        str += lobby.gameData.mapId + "  -  " + lobby.gameData.gameModeId + "  -  " + lobby.state;    
        var players = lobby.game ? lobby.game.getPlayers() : lobby.players;
        str += "<h3>Players: " + players.length + "/" + lobby.maxPlayers + "</h3>";
        str += "<table width='100%'><tr><th>#</th><th>Name</th><th>Level</th><th>Ping</th></tr>"
        for (var i = 0; i < players.length; i++)
        {
            var player = players[i];
            str += "<tr><td>" + i + "</td><td>" + player.name + "</td><td>Level " + player.level + "</td><td>" + (player.ping != null ? player.ping : "-") + "</td></tr>";
        }
        str += "</table>";
    }
    var keys = Object.keys(lobby.gameData.settings);
    for (var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        str += "<br><b>" + key + ":</b> " + lobby.gameData.settings[key];
    }
    str += "</body>";
    res.send(str);
});
app.get("/data", (req, res) =>
{
    var lobby = lobbies[0];
    var data = {
        time: Date.now(),
        name: settings.name,
        country: settings.country,
        numPlayers: lobby.game ? lobby.game.getNumPlayers() : lobby.players.length,
        maxPlayers: lobby.maxPlayers,
        type: settings.type,
        state: lobby.state,
        gameData: {
            gameModeId: lobby.gameData.gameModeId,
            mapId: lobby.gameData.mapId,
            settings: lobby.gameData.settings
        }
    };
    if (lobby.game)
    {
        data.gameData.game = lobby.game.getCurrentGameData();
    }
    res.send(data);
});

io.on("connection", (socket) =>
{
    log(chalk.cyan(socket.id), chalk.green("Connected"));

    if (getNumClients() >= settings.maxPlayers)
    {
        disconnectSocket(socket, "max_players");
        return;
    }

    socket.player = {
        id: (socket.id).substr(2, 6),
        name: "Player",
        level: 1,
        team: 0
    };   

    socket.emit("updateServer", settings);

    socket.on("ping", (_func) =>
    {
        if (typeof _func === "function")
        {
            _func();
        }
    });
    socket.on("vote", (_val) =>
    {
        log(chalk.cyan(socket.id), "vote", _val);
        var lobby = getLobbyData(socket.player.lobbyId);
        if (lobby)
        {
            var votes = lobby.votes;
            if (votes)
            {
                var index = -1;
                for (var i = 0; i < votes.length; i++)
                {
                    var vote = votes[i];
                    index = vote.players.indexOf(socket.id);
                    if (index >= 0)
                    {
                        vote.players.splice(index, 1);
                    }
                }
                var cur = votes[_val];
                if (cur)
                {                    
                    cur.players.push(socket.id);              
                }
                io.to(lobby.id).emit("updateLobby", { votes: votes });
            }
        }
    });
    socket.on("chat", (_message) =>
    {
        log(chalk.cyan(socket.id), "chat", _message);
        sendChatMessageToLobby(socket.player.lobbyId, {
            playerText: socket.player.name,
            playerId: socket.player.id,
            messageText: _message
        });
        var args = _message.split(" ");
        if (args && args.length > 0)
        {
            var lobby = getLobbyData(socket.player.lobbyId);
            switch (args[0])
            {
                case "/end":
                    if (socket.player.bAdmin)
                    {
                        if (lobby.game)
                        {
                            lobby.game.requestEvent({
                                eventId: GameServer.EVENT_GAME_END
                            });
                        }
                    }
                    break;

                case "/stop":
                    if (socket.player.bAdmin)
                    {
                        setLobbyState(lobby.id, LobbyState.WAITING);
                    }
                    break;

                case "/start":
                    if (socket.player.bAdmin)
                    {
                        setLobbyState(lobby.id, LobbyState.WAITING);
                        setLobbyState(lobby.id, LobbyState.IN_PROGRESS);
                    }
                    break;

                case "/name":
                    if (socket.player.bAdmin)
                    {
                        var name = socket.player.name;
                        updatePlayerData(socket, {
                            name: args[1]
                        });
                        sendChatMessageToLobby(lobby.id, {
                            bServer: true,
                            locText: "STR_SERVER_X_CHANGED_NAME_TO_X",
                            params: [name, socket.player.name]
                        });
                    }
                    break;

                case "/spawn":
                    if (socket.player.bAdmin)
                    {
                        var lobby = getLobbyData(socket.player.lobbyId);
                        if (lobby)
                        {
                            if (lobby.game)
                            {
                                lobby.game.spawn(socket.player.id, args);
                            }
                        }
                    }
                    break;

                case "/kill":
                    var lobby = getLobbyData(socket.player.lobbyId);
                    if (lobby)
                    {
                        if (lobby.game)
                        {
                            lobby.game.killPawn(socket.player.id);
                        }
                    }
                    break;

                case "/server":
                    sendChatMessageToSocket(socket, {
                        bServer: true,
                        bDirect: true,
                        messageText: settings.name
                    });
                    break;

                case "/stats":
                    if (stats)
                    {
                        var str = "";
                        var keys = Object.keys(stats);
                        for (var i = 0; i < keys.length; i++)
                        {
                            var key = keys[i];
                            str += key + ": " + stats[key];
                            if (i < keys.length - 1)
                            {
                                str += "\n";
                            }
                        }
                        sendChatMessageToSocket(socket, {
                            bServer: true,
                            bDirect: true,
                            messageText: str
                        });
                    }
                    break;

                case "/kick":
                    if (socket.player.bAdmin)
                    {
                        var index = parseInt(args[1], 10);
                        if (index != null && !isNaN(index))
                        {
                            for (var i = 0; i < lobby.players.length; i++)
                            {
                                var p = lobby.players[i];
                                if (index == i)
                                {
                                    if (p.id == socket.player.id)
                                    {
                                        //continue;
                                    }
                                    var kickSocket = getSocketByPlayerId(p.id);
                                    if (kickSocket)
                                    {
                                        disconnectSocket(kickSocket, "kicked");
                                    }
                                    else
                                    {
                                        leaveLobby(p, "kicked");
                                    }
                                }
                            }
                        }
                    }
                    break;

                case "/bot":
                    if (socket.player.bAdmin)
                    {
                        var bot = getBot(args[2] != null ? parseInt(args[2]) : BotSkill.AUTO);
                        bot.name = "Bot " + lobby.players.length;
                        bot.team = args[1] != null ? parseInt(args[1], 10) : MathUtil.Random(0, 1);
                        joinLobby(bot, lobby.id);
                    }
                    break;

                case "/rules":
                    if (settings.rules)
                    {
                        sendChatMessageToSocket(socket, {
                            bServer: true,
                            bDirect: true,
                            locText: settings.rules
                        });
                    }
                    break;

                case "/players":
                    if (lobby)
                    {
                        var str = "";
                        for (var i = 0; i < lobby.players.length; i++)
                        {
                            var p = lobby.players[i];
                            str += i + "  " + p.name + "  Level " + p.level;
                            if (p.bAdmin)
                            {
                                str += "  [ADMIN]";
                            }
                            if (p.bBot)
                            {
                                str += "  [BOT]";
                            }
                            if (i < lobby.players.length - 1)
                            {
                                str += "\n";
                            }
                        }
                        sendChatMessageToSocket(socket, {
                            bServer: true,
                            bDirect: true,
                            messageText: str
                        });
                    }
                    break;

                case "/voteskip":
                    if (lobby && lobby.game)
                    {
                        if (1 || !settings.bUseLobby)
                        {
                            if (!lobby.voteskips)
                            {
                                lobby.voteskips = [];
                            }
                            if (lobby.voteskips.indexOf(socket.player.id) == -1)
                            {
                                lobby.voteskips.push(socket.player.id);
                            }
                            var numReal = getNumRealPlayers(lobby.players);
                            sendChatMessageToLobby(lobby.id, {
                                bServer: true,
                                locText: "STR_SERVER_VOTESKIP_X_X",
                                params: [lobby.voteskips.length, numReal]
                            });
                            if (lobby.voteskips.length >= numReal)
                            {
                                lobby.game.requestEvent({
                                    eventId: GameServer.EVENT_GAME_END
                                });
                            }
                        }
                    }
                    break;

                case "/votekick":
                    if (lobby)
                    {
                        if (settings.bAllowVotekick)
                        {
                            var index = parseInt(args[1], 10);
                            if (index != null && !isNaN(index))
                            {
                                for (var i = 0; i < lobby.players.length; i++)
                                {
                                    var p = lobby.players[i];
                                    if (index == i)
                                    {
                                        if (p.id == socket.player.id)
                                        {
                                            sendChatMessageToSocket(socket, {
                                                bServer: true,
                                                bDirect: true,
                                                locText: "STR_SERVER_VOTEKICK_SELF"
                                            });
                                            var kickNum = 0;
                                            continue;
                                        }
                                        if (p.bAdmin)
                                        {
                                            sendChatMessageToSocket(socket, {
                                                bServer: true,
                                                bDirect: true,
                                                locText: "STR_SERVER_VOTEKICK_ADMIN"
                                            });
                                            var kickNum = 0;
                                            continue;
                                        }
                                        if (p.votekicks == null)
                                        {
                                            p.votekicks = {};
                                        }
                                        p.votekicks[socket.player.id] = 1;
                                        var numVotes = Object.keys(p.votekicks).length;
                                        kickNum = Math.ceil(lobby.players.length * 0.5) + 1;
                                        sendChatMessageToLobby(lobby.id, {
                                            bServer: true,
                                            locText: "STR_SERVER_VOTEKICK_VOTES_AGAINST_X_X_X",
                                            params: [p.name, numVotes, kickNum]
                                        });
                                        if (numVotes >= kickNum)
                                        {
                                            var voteSocket = getSocketByPlayerId(p.id);
                                            if (voteSocket)
                                            {
                                                disconnectSocket(voteSocket, "kicked");
                                            }
                                            else
                                            {
                                                leaveLobby(p, "kicked");
                                            }
                                        }
                                        break;
                                    }
                                }
                                if (kickNum == null)
                                {
                                    sendChatMessageToSocket(socket, {
                                        bServer: true,
                                        bDirect: true,
                                        locText: "STR_SERVER_VOTEKICK_NOT_FOUND"
                                    });
                                }
                            }
                            else
                            {
                                sendChatMessageToSocket(socket, {
                                    bServer: true,
                                    bDirect: true,
                                    locText: "STR_SERVER_VOTEKICK_INVALID"
                                });
                            }
                        }
                        else
                        {
                            sendChatMessageToSocket(socket, {
                                bServer: true,
                                bDirect: true,
                                locText: "STR_SERVER_VOTEKICK_DISABLED"
                            });
                        }
                    }
                    break;

                case "/disconnect":
                    disconnectSocket(socket);
                    break;
            }
        }
    });
    socket.on("update", (_data) =>
    {        
        updatePlayerData(socket, _data);
    });
    socket.on("latency", (_ms) => 
    {
        socket.player.ping = _ms;
        var lobby = getLobbyData(socket.player.lobbyId);
        if (lobby && lobby.game)
        {
            lobby.game.setPlayerPing(socket.player.id, socket.player.ping);
        }
    });
    socket.on("startGame", () => 
    {
        log(chalk.cyan(socket.id), "start game");
        setLobbyState(socket.player.lobbyId, LobbyState.IN_PROGRESS);
    });
    socket.on("stopGame", () => 
    {
        log(chalk.cyan(socket.id), "stop game");
        var lobby = getLobbyData(socket.player.lobbyId);
        if (lobby)
        {
            if (settings.bUseLobby && socket.player.bAdmin)
            {
                setLobbyState(lobby.id, LobbyState.WAITING);
            }
            else
            {
                disconnectSocket(socket);
            }
        }
    });
    socket.on("setPlayerTeam", (_data) =>
    {
        log(chalk.cyan(socket.id), _data);
        var socket2 = getSocketByPlayerId(_data.id);
        if (socket2)
        {
            socket2.player.team = _data.team;
            var lobby = getLobbyData(socket.player.lobbyId);
            if (lobby)
            {
                io.to(lobby.id).emit("updateLobby", { players: lobby.players });
            }
        }
    });
    socket.on("updateGameSettings", (_data) => 
    {
        log(chalk.cyan(socket.id), _data);
        if (!_data)
        {
            return;
        }
        var lobby = getLobbyData(socket.player.lobbyId);
        if (lobby)
        {
            var num = 0;
            var keys = Object.keys(_data);
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                var value = _data[key];
                if (key == "settings")
                {
                    var settingsKeys = Object.keys(_data.settings);
                    for (var j = 0; j < settingsKeys.length; j++)
                    {
                        var settingsKey = settingsKeys[j];
                        var settingsValue = _data.settings[settingsKey];
                        if (lobby.gameData.settings[settingsKey] !== settingsValue)
                        {
                            num++;
                        }
                        lobby.gameData.settings[settingsKey] = settingsValue;
                    }
                }
                else
                {
                    if (lobby.gameData[key] !== value)
                    {
                        num++;
                    }
                    lobby.gameData[key] = value;
                    switch (key)
                    {
                        case "gameModeId":
                            var mode = getGameMode(value);
                            if (mode)
                            {
                                if (mode.bSurvival)
                                {
                                    setAllLobbyPlayersTeam(lobby, -1);
                                }
                                else
                                {
                                    setAllLobbyPlayersToRecommendedTeam(lobby);
                                }
                            }
                            break;
                    }
                }
            }
            io.to(lobby.id).emit("updateLobby", { gameData: lobby.gameData });
            if (num > 0)
            {
                sendChatMessageToLobby(lobby.id, {
                    bServer: true,
                    locText: "STR_SERVER_SETTINGS_CHANGED_X",
                    params: [num]
                });
            }
        }
    });
    socket.on("requestEvent", (_data) =>
    {
        var lobby = getLobbyData(socket.player.lobbyId);
        if (lobby)
        {
            var game = lobby.game;
            if (game)
            {
                game.requestEvent(_data);
            }
        }
    });
    socket.on("requestGame", () =>
    {
        log(chalk.cyan(socket.id), "request game");
        var lobby = getLobbyData(socket.player.lobbyId);
        if (lobby)
        {
            var game = lobby.game;
            if (game)
            {
                var items = [];
                items.push(game.getInitEventData());
                game.addPlayer(clone(socket.player));
                items.push(game.getGameModeEventData());
                if (game.matchInProgress())
                {
                    items.push(game.getGameStartEventData());
                }
                var gamePlayers = game.getPlayers();
                for (var i = 0; i < gamePlayers.length; i++)
                {
                    var ps = gamePlayers[i];
                    if (ps.id != socket.player.id)
                    {
                        items.push({
                            eventId: GameServer.EVENT_PLAYER_JOIN,
                            player: clone(ps),
                            bSilent: true
                        });
                    }
                }
                var all = game.getObjectsEventData();
                for (var i = 0; i < all.length; i++)
                {
                    items.push(all[i]);
                }
                log(items.length, "events");
                socket.emit("gameEvent", {
                    eventId: GameServer.EVENT_BATCH,
                    lobbyId: lobby.id,
                    items: items
                });
                if (settings.welcome)
                {
                    sendChatMessageToSocket(socket, {
                        bServer: true,
                        bDirect: true,
                        locText: settings.welcome
                    });
                }
            }
        }
    });
    socket.on("disconnect", () =>
    {
        log(chalk.cyan(socket.id), chalk.red("Disconnected"));
        leaveLobby(socket.player, socket.disconnectReason);
    });
});

var lobbies = [];
createLobby();
if (!settings.bUseLobby)
{
    setLobbyState(lobbies[0].id, LobbyState.IN_PROGRESS);
}

function createLobby()
{
    if (settings.bUseLobby)
    {
        var gameData = clone(settings.gameData);
    }
    else
    {
        gameData = clone(settings.gameData);
    }    
    var lobby = {
        id: getRandomUniqueId(),
        name: settings.name,
        state: LobbyState.WAITING,
        players: [],
        maxPlayers: settings.maxPlayers,
        chat: [],
        gameData: gameData
    }
    lobbies.push(lobby);
}

function getLobbyPlayerTeam(_lobby)
{
    switch (_lobby.gameData.gameModeId)
    {
        case GameMode.SURVIVAL_SIEGE:
        case GameMode.SURVIVAL_TERRORIST:
        case GameMode.SURVIVAL_ZOMBIE:
            return 0;
    }
    return _lobby.players.length % 2 == 0 ? 0 : 1
}

function getRecommendedPlayerTeam(_player)
{
    var lobby = getLobbyData(_player.lobbyId);
    if (lobby)
    {
        var index = lobby.players.indexOf(_player);
        if (index >= 0)
        {
            return index % 2 == 0 ? 0 : 1;
        }
    }
    return 0;
}

function joinLobby(_player, _lobbyId)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        var socket = getSocketByPlayerId(_player.id);
        if (socket)
        {
            socket.join(_lobbyId);            
        }
        _player.lobbyId = _lobbyId;
        lobby.players.push(_player);
        _player.team = getRecommendedPlayerTeam(_player);
        log(lobby.players.length, "in lobby");  
        if (socket)
        {
            socket.emit("updateLobby", getClientLobbyData(lobby));
        }
        io.to(lobby.id).emit("updateLobby", { players: lobby.players });
        if (lobby.game)
        {
            if (socket)
            {
                socket.emit("prepareGame", lobby.gameData);
                setTimeout(() => {
                    if (lobby.gameData.bSquadCombat) {
                        var squad = createSquad(_player.id);
                        var squadMembers = createSquadMembers(_player, squad);
                        for (var k = 0; k < squadMembers.length; k++) {
                            lobby.game.addPlayer(squadMembers[k]);
                        }
                        lobby.gameData.squads.push(squad);
                    }
                    enterGame(socket);
                }, 2000);
            }
            else
            {
                if (lobby.gameData.bSquadCombat)
                {
                    var squad = createSquad(_player.id);
                    var squadMembers = createSquadMembers(_player, squad);
                    for (var k = 0; k < squadMembers.length; k++)
                    {
                        lobby.game.addPlayer(squadMembers[k]);
                    }
                    lobby.gameData.squads.push(squad);
                }
                else
                {
                    lobby.game.addPlayer(clone(_player));
                }
            }
        }
        else
        {
            sendChatMessageToLobby(lobby.id, {
                locText: "STR_X_JOINED",
                params: [_player.name]
            });
        }
    }
}

function sendChatMessageToLobby(_lobbyId, _data)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        if (lobby.chat.length > 50)
        {
            lobby.chat.splice(0, 1);
        }
        _data.date = Date.now();
        lobby.chat.push(_data);
        io.to(lobby.id).emit("chat", _data);
    }
}

function sendChatMessageToSocket(_socket, _data)
{
    if (_socket)
    {
        _data.date = Date.now();
        _socket.emit("chat", _data);
    }
}

function enterGame(_socket)
{
    if (_socket)
    {
        _socket.emit("enterGame");
    }
}

function setAllLobbyPlayersTeam(_lobby, _team)
{
    if (_lobby)
    {
        for (var i = 0; i < _lobby.players.length; i++)
        {
            var ps = _lobby.players[i];
            ps.team = _team;
        }
        log(_lobby.players);
        io.to(_lobby.id).emit("updateLobby", { players: _lobby.players });
    }
    else
    {
        console.warn("Invalid lobby", _lobby, _team);
    }
}

function setAllLobbyPlayersToRecommendedTeam(_lobby)
{
    for (var i = 0; i < _lobby.players.length; i++)
    {
        var ps = _lobby.players[i];
        ps.team = getRecommendedPlayerTeam(ps);
    }
    io.to(_lobby.id).emit("updateLobby", { players: _lobby.players });
}

function setLobbyState(_lobbyId, _state)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        destroyLobbyGame(lobby.id);
        delete lobby.voteskips;
        lobby.state = _state;
        lobby.chat = [];
        if (lobby.interval)
        {
            clearInterval(lobby.interval);
        }
        if (lobby.infoInterval)
        {
            clearInterval(lobby.infoInterval);
        }
        log(chalk.magenta(lobby.id), lobby.state);
        switch (_state)
        {
            case LobbyState.IN_PROGRESS:
                switch (lobby.gameData.gameModeId)
                {
                    case GameMode.SURVIVAL_SIEGE:
                    case GameMode.SURVIVAL_TERRORIST:
                    case GameMode.SURVIVAL_ZOMBIE:
                        setAllLobbyPlayersTeam(lobby, 0);
                        break;
                }
                incrementStat("games");
                var gameData = lobby.gameData;
                gameData.bMultiplayer = true;
                gameData.lobbyId = lobby.id;                
                if (!settings.bUseLobby)
                {
                    var modeData = getGameMode(gameData.gameModeId);
                    if (modeData.bSurvival)
                    {
                        gameData.settings.bots = Math.min(4, settings.gameData.settings.bots);
                    }
                    else
                    {
                        gameData.settings.bots = settings.gameData.settings.bots;
                    }
                    var set = gameData.settings;
                    var defaults = shared.defaultGameSettings[gameData.gameModeId];
                    if (defaults)
                    {
                        var keys = Object.keys(defaults);
                        if (keys)
                        {
                            for (var i = 0; i < keys.length; i++)
                            {
                                var key = keys[i];
                                if (set[key])
                                {
                                    set[key] = defaults[key];
                                }
                                else
                                {
                                    console.warn(set, key);
                                }
                            }
                        }
                    }
                }
                gameData.data = {
                    p2: p2,
                    graph: graph,
                    path: path,
                    shared: shared,
                    sprites: sprites,
                    weapons_world: weapons_world,
                    weapons: weapons,
                    vehicles: vehicles,
                    mods: mods,
                    modes: modes,
                    maps: allMaps,
                    callbacks: {
                        onPlayerKill: () =>
                        {
                            incrementStat("kills");
                        },
                        onTankKill: () =>
                        {
                            incrementStat("tankKills");
                        },
                        onHeliKill: () =>
                        {
                            incrementStat("heliKills");
                        }
                    }
                };
                startGame(lobbies[0].id, gameData);
                if (settings.info)
                {
                    lobby.infoInterval = setInterval(() =>
                    {
                        if (MathUtil.RandomBoolean())
                        {
                            var rand = MathUtil.Random(0, 3);
                            switch (rand)
                            {
                                case 0:
                                    var msg = "STR_SERVER_X_GAMES";
                                    var params = [stats.games];
                                    break;
                                case 1:
                                    msg = "STR_SERVER_X_PLAYER_KILLS";
                                    params = [stats.kills];
                                    break;
                                case 2:
                                    msg = "STR_SERVER_X_TANK_KILLS";
                                    params = [stats.tankKills];
                                    break;
                                case 3:
                                    msg = "STR_SERVER_X_HELI_KILLS";
                                    params = [stats.heliKills];
                                    break;
                            }
                        }
                        else
                        {
                            msg = settings.info[MathUtil.Random(0, settings.info.length - 1)]
                        }
                        sendChatMessageToLobby(lobby.id, {
                            bServer: true,
                            locText: msg,
                            params: params
                        });
                    }, 60000);
                }
                break;
            case LobbyState.WAITING:
                for (var i = 0; i < lobby.players.length; i++)
                {
                    var p = lobby.players[i];
                    if (p.votekicks)
                    {
                        delete p.votekicks;
                    }
                }
                break;
        }
        io.to(lobby.id).emit("updateLobby", { state: lobby.state, chat: lobby.chat });
    }
}

function getSocketById(_id)
{
    return io.sockets.sockets.get(_id);
}

function getClientLobbyData(_lobby)
{
    var data = null;
    if (_lobby)
    {
        data = {};
        var keys = Object.keys(_lobby);
        for (var i = 0; i < keys.length; i++)
        {
            let key = keys[i];
            switch (key)
            {
                case "game":
                case "infoInterval":
                case "interval":
                    break;                
                default:
                    data[key] = _lobby[key];
                    break;
            }
        }
    }
    return data;
}

function leaveLobby(_player, _reason)
{
    var lobby = getLobbyData(_player.lobbyId);
    if (lobby)
    {       
        if (lobby.voteskips)
        {
            var skipIndex = lobby.voteskips.indexOf(_player.id);
            if (skipIndex >= 0)
            {
                lobby.voteskips.splice(skipIndex, 1);
            }
        }
        if (lobby.game)
        {
            lobby.game.requestEvent({
                eventId: GameServer.EVENT_PLAYER_LEAVE,
                playerId: _player.id,
                reason: _reason
            });
            if (lobby.gameData.bSquadCombat)
            {
                var squad = getSquadById(_player.id, _player.lobbyId);
                if (squad) {
                    lobby.game.requestEvent({
                        eventId: GameServer.EVENT_PLAYER_LEAVE,
                        playerId: squad.assault
                    });
                    lobby.game.requestEvent({
                        eventId: GameServer.EVENT_PLAYER_LEAVE,
                        playerId: squad.engineer
                    });
                    lobby.game.requestEvent({
                        eventId: GameServer.EVENT_PLAYER_LEAVE,
                        playerId: squad.support
                    });
                    lobby.game.requestEvent({
                        eventId: GameServer.EVENT_PLAYER_LEAVE,
                        playerId: squad.recon
                    });
                    lobby.gameData.squads.splice(squad);
                }
            }
        }
        lobby.players.splice(lobby.players.indexOf(_player), 1);
        _player.lobbyId = null;
        var socket = getSocketByPlayerId(_player.id);
        if (socket)
        {
            socket.leave();
        }
        log(lobby.players.length, "in lobby");
        io.to(lobby.id).emit("updateLobby", { players: lobby.players });
        if (settings.bUseLobby && lobby.players.length == 0)
        {
            setLobbyState(lobby.id, LobbyState.WAITING);
        }
        if (!lobby.game)
        {
            switch (_reason)
            {
                case "kicked":
                    var str = "STR_X_KICKED";
                    break;
                case "timed_out":
                    str = "STR_X_TIMED_OUT";
                    break;
                default:
                    str = "STR_X_LEFT";
                    break;
            }
            sendChatMessageToLobby(lobby.id, {
                locText: str,
                params: [_player.name]
            });
        }
    }
}

function startGame(_lobbyId, _gameData)
{  
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        destroyLobbyGame(_lobbyId);
        delete require.cache[require.resolve("./assets/js/game")];
        var game = new (require("./assets/js/game").GameInstance)();
        var players = clone(lobby.players);
        switch (lobby.gameData.gameModeId)
        {
            case GameMode.SURVIVAL_SIEGE:
            case GameMode.SURVIVAL_TERRORIST:
            case GameMode.SURVIVAL_ZOMBIE:
                for (var i = 0; i < _gameData.settings.bots; i++)
                {
                    var bot = getBot(_gameData.settings.botSkill);
                    bot.name = "Bot " + i;
                    bot.team = 0;
                    players.push(bot);
                }
                break;
            default:
                if (_gameData.settings.bSquadCombat)
                {
                    _gameData.bSquadCombat = true;
                    var bots = [];
                    var squads = [];
                    for (var i = 0; i < players.length; i++)
                    {
                        var squad = createSquad(players[i].id);
                        var squadMembers = createSquadMembers(players[i], squad);
                        bots.push(...squadMembers);
                        squads.push(squad);
                    }
                    for (var i = 0; i < _gameData.settings.bots; i++)
                    {
                        var bot = getBot(_gameData.settings.botSkill);
                        bot.name = "Bot " + i;
                        bot.team = _gameData.settings.botTeam >= 0 ? _gameData.settings.botTeam : (i % 2 == 0 ? 0 : 1);
                        var squad = createSquad(bot.id);
                        var squadMembers = createSquadMembers(bot.id, squad);
                        bots.push(...squadMembers);
                        squads.push(squad); // Technically no need to add bot squads to the list of squads, since nothing will be done with them
                    }
                    players = bots;
                    _gameData.squads = squads;
                }
                else
                {
                    for (var i = 0; i < _gameData.settings.bots; i++)
                    {
                        var bot = getBot(_gameData.settings.botSkill);
                        bot.name = "Bot " + i;
                        bot.team = _gameData.settings.botTeam >= 0 ? _gameData.settings.botTeam : (i % 2 == 0 ? 0 : 1);
                        players.push(bot);
                    }
                }
                break;
        }
        _gameData.players = players;
        game.init(_gameData, function (_data)
        {
            if (_data)
            {
                io.to(lobby.id).emit("gameEvent", _data);
            }
        }, p2);
        game.setEndCallback(onEndGame);
        lobby.gameData = _gameData;
        lobby.game = game;
        io.to(lobby.id).emit("prepareGame", lobby.gameData);
        setTimeout(() =>
        {
            io.to(lobby.id).emit("enterGame");
        }, 3000);
    }
}

function onEndGame(_lobbyId)
{  
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        if (settings.bAllowVotes)
        {
            var votes = [];
            var maps = [
                Map.DOWNTURN,
                Map.OVERGROWN,
                Map.BATTLESHIP
            ];
            var gameModes = clone(modes);
            shuffleArray(gameModes);
            for (var i = 0; i < 3; i++)
            {
                var vote = {
                    id: gameModes[i].id,
                    mapId: maps[MathUtil.Random(0, maps.length - 1)],
                    players: []
                };
                votes.push(vote);
            }
            lobby.votes = votes;
            log(votes);
            io.to(lobby.id).emit("updateLobby", { votes: votes });
        }
        lobby.timer = 15;
        lobby.interval = setInterval(() =>
        {
            var lobby = getLobbyData(_lobbyId);            
            lobby.timer--;            
            if (lobby.timer < 0)
            {                
                if (settings.bUseLobby)
                {
                    setLobbyState(_lobbyId, LobbyState.WAITING);
                }
                else
                {
                    if (settings.bAllowVotes && lobby.votes)
                    {
                        votes.sort((a, b) =>
                        {
                            if (a.players.length > b.players.length) return -1;
                            if (a.players.length < b.players.length) return 1;
                            return 0;
                        });
                        var winningVote = votes[0];
                        lobby.gameData.gameModeId = winningVote.id;
                        if (winningVote.mapId)
                        {
                            lobby.gameData.mapId = winningVote.mapId;
                        }
                    }
                    setLobbyState(_lobbyId, LobbyState.IN_PROGRESS);
                }
            }
            else
            {
                io.to(lobby.id).emit("updateLobby", { timer: lobby.timer });
            }
        }, 1000);
    }
}

function destroyLobbyGame(_lobbyId)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        var game = lobby.game;
        if (game)
        {
            game.destroy();
            delete lobby.game;
        }
    }
}

function updatePlayerData(_socket, _data)
{
    log(chalk.cyan(_socket.id), "update");
    if (_data)
    {
        if (_data.version && _data.version != ServerData.GAME_VERSION)
        {
            disconnectSocket(_socket, "version_mismatch");
            return;
        }
        if (_data.bAdmin)
        {
            _socket.player.bAdmin = _data.bAdmin == true;
        }
        if (_data.name)
        {
            _socket.player.name = _data.name;
        }
        if (_data.level)
        {
            _socket.player.level = _data.level;
        }
        if (_data.currentClass)
        {
            _socket.player.currentClass = _data.currentClass;
        }
        if (_data.classes)
        {
            _socket.player.classes = _data.classes;
        }
        if (_data.class)
        {
            _socket.player.classes[_data.class.id] = _data.class.data;
        }
        if (_data.vehicles)
        {
            if (!_socket.player.vehicles)
            {
                _socket.player.vehicles = _data.vehicles;
            }
            else
            {
                var keys = Object.keys(_data.vehicles);
                for (var i = 0; i < keys.length; i++)
                {
                    var key = keys[i];
                    _socket.player.vehicles[key] = _data.vehicles[key];
                }
            }
        }
        if (!_socket.player.lobbyId)
        {
            joinLobby(_socket.player, lobbies[0].id);
        }
        var lobby = getLobbyData(_socket.player.lobbyId);
        if (lobby)
        {
            io.to(lobby.id).emit("updateLobby", { players: lobby.players });
            var game = lobby.game;
            if (game)
            {
                game.updatePlayer(_socket.player);
            }
        }
    }
}

function getLobbyData(_lobbyId)
{
    if (!_lobbyId)
    {
        return null;
    }
    for (var i = 0; i < lobbies.length; i++)
    {
        if (lobbies[i].id == _lobbyId)
        {
            return lobbies[i];
        }
    }
    return null;
}

function getBot(_botSkill)
{
    var level = 1;
    var botSkill = Math.min(_botSkill, BotSkill.GOD);
    if (_botSkill == BotSkill.AUTO)
    {
        _botSkill = MathUtil.Random(BotSkill.EASY, BotSkill.HARD);
        botSkill = _botSkill;
    }
    switch (botSkill)
    {
        case 0:
            level = MathUtil.Random(1, 9);
            break;
        case 1:
            level = MathUtil.Random(10, 49);
            break;
        case 2:
            level = MathUtil.Random(50, 99);
            break;
        case 3:
            level = MathUtil.Random(50, 99);
            break;
        case 4:
            level = 100;
            break;
    }
    var player = {
        id: getRandomUniqueId(),
        name: "Bot",
        bBot: true,
        botSkill: botSkill,
        level: level
    };
    return player;
}

function createSquad(_playerId)
{
    var squadIds = [
        getRandomUniqueId(),
        getRandomUniqueId(),
        getRandomUniqueId(),
        getRandomUniqueId()
    ];
    var squad = {
        playerId: _playerId, //playerId acts as the squad's id, since the player itself never enters the game
        assault: squadIds[0],
        engineer: squadIds[1],
        support: squadIds[2],
        recon: squadIds[3],
    };
    return squad;
}

function createSquadMembers(_player, _squad)
{
    var squadMembers = [];
    var botSkill = _player.botSkill;
    if (!_player.botSkill)
    {
        if (_player.level <= 9) botSkill = BotSkill.EASY;
        else if (_player.level <= 49) botSkill = BotSkill.NORMAL;
        else if (_player.level <= 75) botSkill = BotSkill.HARD;
        else if (_player.level <= 99) botSkill = BotSkill.INSANE;
        else if (_player.level >= 100) botSkill = BotSkill.GOD;
    }

    for (var j = 0; j < 4; j++)
    {
        var bot = clone(_player);
        bot.bBot = true;
        if (bot.bAdmin) bot.bAdmin = false;
        bot.botSkill = botSkill;
        bot.team = _player.team;
        switch (j)
        {
            case 0:
                bot.id = _squad.assault
                bot.currentClass = "ASSAULT";
                break;
            case 1:
                bot.id = _squad.engineer
                bot.currentClass = "ENGINEER";
                break;
            case 2:
                bot.id = _squad.support
                bot.currentClass = "SUPPORT";
                break;
            case 3:
                bot.id = _squad.recon
                bot.currentClass = "RECON";
                break;
        }
        bot.squad = _squad;
        squadMembers.push(bot);
    }
    return squadMembers;
}

function getSquadById(_id, _lobbyId)
{
    var lobby = getLobbyData(_lobbyId);
    var squads = lobby.gameData.squads;
    for (var i = 0; i < squads.length; i++) {
        if (squads[i].playerId == _id) {
            return squads[i];
        }
    }
    return null;
}

function disconnectSocket(_socket, _reason)
{
    if (_socket)
    {
        _socket.emit("disconnectInfo", _reason);
        _socket.disconnectReason = _reason;
        _socket.disconnect();
    }
}

function getNumRealPlayers(_players)
{
    if (_players)
    {
        var num = 0;
        for (var i = 0; i < _players.length; i++)
        {
            var ps = _players[i];
            if (!ps.bBot)
            {
                num++;
            }
        }
        return num;
    }
    return 0;
}

function getNumClients()
{
    let num = 0;
    io._nsps.forEach((namespace) =>
    {
        num += namespace.sockets.size;
    });
    return num;
}

function getGameMode(_id)
{
    for (var i = 0; i < modes.length; i++)
    {
        var mode = modes[i];
        if (mode.id == _id)
        {
            return mode;
        }
    }
    return null;
}

function getSocketByPlayerId(_id)
{
    for (const [_, socket] of io.of("/").sockets)
    {
        if (socket.player.id == _id)
        {
            return socket;
        }
    }
    return null;
}

function getVotesAgainstPlayer(_id)
{
    var socket = getSocketByPlayerId(_id);
    if (socket)
    {
        if (socket.player.votekicks)
        {
            var keys = Object.keys(socket.player.votekicks);
            return keys.length;
        }
    }
    return 0;
}

function getRandomUniqueId()
{
    return Math.random().toString(36).substr(2, 4);
}

function shuffleArray(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function clone(_data)
{
    return JSON.parse(JSON.stringify(_data));
}

function convertMS(milliseconds)
{
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

server.listen(process.env.PORT || settings.port, () =>
{
    log("\nListening on " + server.address().family + " " + chalk.inverse(server.address().address) + ":" + chalk.inverse(server.address().port) + "\n");
});