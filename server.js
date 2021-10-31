/**
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
    GAME_VERSION: "0.0.5",
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
    TEAM_DEATHMATCH: "team_deathmatch"
};
const Map = {
    SIEGE: "map_siege"
};
const Faction = {
    US: "us",
    RU: "ru"
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

app.use(cors({
    origin: "*"
}));
app.get("/", (req, res) =>
{
    var str = "";
    res.send("<title>DS:C Multiplayer Server</title><body>" + str + "</body>");
});
app.get("/data", (req, res) =>
{
    var lobby = lobbies[0];
    var data = {
        time: Date.now(),
        name: settings.name,
        numPlayers: getNumClients(),
        maxPlayers: settings.maxPlayers,
        type: settings.type,
        state: lobby.state,
        gameData: {
            gameModeId: lobby.gameData.gameModeId,
            mapId: lobby.gameData.mapId,
            settings: lobby.gameData.settings
        }
    };
    res.send(data);
});

io.on("connection", (socket) =>
{
    log(chalk.cyan(socket.id), chalk.green("Connected"));

    if (getNumClients() >= settings.maxPlayers)
    {
        socket.disconnect();
        return;
    }

    socket.player = {
        id: (socket.id).substr(2, 6),
        name: "Player",
        level: 1,
        team: 0
    };    

    socket.on("ping", (_func) =>
    {
        if (typeof _func === "function")
        {
            _func();
        }
    });
    socket.on("chat", (_message) =>
    {
        log(chalk.cyan(socket.id), "chat", _message);
        sendChatMessage(socket.player.lobbyId, {
            date: Date.now(),
            playerText: socket.player.name,
            playerId: socket.player.id,
            messageText: _message
        });
    });
    socket.on("update", (_data) =>
    {
        log(chalk.cyan(socket.id), "update");
        if (_data)
        {
            if (_data.version && _data.version != ServerData.GAME_VERSION)
            {
                socket.disconnect();
                return;
            }          
            if (_data.name)
            {
                socket.player.name = _data.name;
            }
            if (_data.level)
            {
                socket.player.level = _data.level;
            }
            if (_data.currentClass)
            {
                socket.player.currentClass = _data.currentClass;
            }
            if (_data.classes)
            {
                socket.player.classes = _data.classes;
            }
            if (_data.class)
            {
                socket.player.classes[_data.class.id] = _data.class.data;
            }
            if (_data.vehicles)
            {
                if (!socket.player.vehicles)
                {
                    socket.player.vehicles = _data.vehicles;
                }
                else
                {
                    var keys = Object.keys(_data.vehicles);
                    for (var i = 0; i < keys.length; i++)
                    {
                        var key = keys[i];
                        socket.player.vehicles[key] = _data.vehicles[key];
                    }
                }
            }
            if (!socket.player.lobbyId)
            {
                joinLobby(socket, lobbies[0].id);
            }
            var lobby = getLobbyData(socket.player.lobbyId);
            if (lobby)
            {            
                io.to(lobby.id).emit("updateLobby", { players: lobby.players });
            }
        }
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
                socket.disconnect();
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
                        lobby.gameData.settings[settingsKey] = settingsValue;
                    }
                }
                else
                {
                    lobby.gameData[key] = value;
                }
            }
            io.to(lobby.id).emit("updateLobby", { gameData: lobby.gameData });
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
                            player: ps,
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
            }
        }
    });
    socket.on("disconnect", () =>
    {
        log(chalk.cyan(socket.id), chalk.red("Disconnected"));
        leaveLobby(socket);
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
        /*
        var gameData = {
            gameModeId: GameMode.TEAM_DEATHMATCH,
            mapId: Map.SIEGE,
            settings: {
                timeLimit: 10,
                scoreLimit: 100,
                respawnTime: 5,
                preGameTimer: 10,
                bAllowRespawns: true,
                bSpawnProtection: true,
                bVehicles: true,
                bWeaponDrops: true,
                bots: 0,
                botSkill: BotSkill.EASY
            }
        }
        */
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

function joinLobby(_socket, _lobbyId)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        _socket.join(_lobbyId);
        _socket.player.lobbyId = _lobbyId;
        _socket.player.team = lobby.players.length % 2 == 0 ? 0 : 1;
        lobby.players.push(_socket.player);
        log(lobby.players.length, "in lobby");       
        _socket.emit("updateLobby", getClientLobbyData(lobby));
        io.to(lobby.id).emit("updateLobby", { players: lobby.players });
        if (lobby.game)
        {
            _socket.emit("prepareGame", lobby.gameData);
            setTimeout(() =>
            {
                enterGame(_socket);
            }, 3000);
        }
        else
        {
            console.log(_socket.player.name);
            sendChatMessage(lobby.id, {
                date: Date.now(),
                locText: "STR_X_JOINED",
                params: [_socket.player.name]
            });
        }
    }
}

function sendChatMessage(_lobbyId, _data)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        if (lobby.chat.length > 50)
        {
            lobby.chat.splice(0, 1);
        }
        lobby.chat.push(_data);
        io.to(lobby.id).emit("chat", _data);
    }
}

function enterGame(_socket)
{
    if (_socket)
    {
        _socket.emit("enterGame");
    }
}

function setLobbyState(_lobbyId, _state)
{
    var lobby = getLobbyData(_lobbyId);
    if (lobby)
    {
        destroyLobbyGame(lobby.id);
        lobby.state = _state;
        lobby.chat = [];
        log(chalk.magenta(lobby.id), lobby.state);
        switch (_state)
        {
            case LobbyState.IN_PROGRESS:  
                var gameData = lobby.gameData;
                gameData.bMultiplayer = true;
                gameData.lobbyId = lobby.id;
                gameData.settings.factions = [Faction.US, Faction.RU];
                gameData.data = {
                    p2: p2,
                    graph: graph,
                    path: path,
                    shared: shared,
                    sprites: sprites,
                    weapons_world: weapons_world,
                    weapons: weapons,
                    mods: mods,
                    modes: modes,
                    maps: allMaps
                };
                startGame(lobbies[0].id, gameData);
                break;
            case LobbyState.WAITING:

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
                    break;
                default:
                    data[key] = _lobby[key];
                    break;
            }
        }
    }
    return data;
}

function leaveLobby(_socket)
{
    var lobby = getLobbyData(_socket.player.lobbyId);
    if (lobby)
    {       
        if (lobby.game)
        {
            lobby.game.requestEvent({
                eventId: GameServer.EVENT_PLAYER_LEAVE,
                playerId: _socket.player.id
            });
        }
        lobby.players.splice(lobby.players.indexOf(_socket.player), 1);
        _socket.player.lobbyId = null;
        _socket.leave();        
        log(lobby.players.length, "in lobby");
        io.to(lobby.id).emit("updateLobby", { players: lobby.players });
        if (settings.bUseLobby && lobby.players.length == 0)
        {
            setLobbyState(lobby.id, LobbyState.WAITING);
        }
        if (!lobby.game)
        {
            sendChatMessage(lobby.id, {
                date: Date.now(),
                locText: "STR_X_LEFT",
                params: [_socket.player.name]
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
        for (var i = 0; i < _gameData.settings.bots; i++)
        {
            var bot = getBot(_gameData.settings.botSkill);
            bot.name = "Bot " + i;
            bot.team = _gameData.settings.botTeam >= 0 ? _gameData.settings.botTeam : (i % 2 == 0 ? 1 : 0);
            players.push(bot);
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
    log("End game", _lobbyId);
    setTimeout(() =>
    {
        var lobby = getLobbyData(_lobbyId);
        if (settings.bUseLobby)
        {
            setLobbyState(_lobbyId, LobbyState.WAITING);
        }
        else
        {
            setLobbyState(_lobbyId, LobbyState.IN_PROGRESS);
        }
    }, 10000);
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
    var prestige = 0;
    var botSkill = _botSkill;
    if (_botSkill == BotSkill.AUTO)
    {
        _botSkill = MathUtil.Random(BotSkill.EASY, BotSkill.HARD);
        botSkill = _botSkill;
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

function getNumClients()
{
    let num = 0;
    io._nsps.forEach((namespace) =>
    {
        num += namespace.sockets.size;
    });
    return num;
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

function getRandomUniqueId()
{
    return Math.random().toString(36).substr(2, 4);
}

function clone(_data)
{
    return JSON.parse(JSON.stringify(_data));
}

server.listen(process.env.PORT || settings.port, () =>
{
    log("\nListening on " + server.address().family + " " + chalk.inverse(server.address().address) + ":" + chalk.inverse(server.address().port) + "\n");
});