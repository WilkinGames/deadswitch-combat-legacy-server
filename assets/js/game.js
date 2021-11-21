/**
 * Deadswitch: Combat
 * game.js - Game Logic
 * ©2021 Wilkin Games
 * https://xwilkinx.com
 */

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
    EVENT_INTERACTABLE_USED: 60,
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
    PAWN_VEHICLE_ENTER: 49,
    PAWN_VEHICLE_LEAVE: 50,
    PAWN_UPDATE: 51,
    PAWN_PARACHUTE: 52,
    PAWN_VEHICLE_HORN: 54,
    PAWN_VEHICLE_UPDATE: 54,
    PAWN_SWITCH_SEATS: 55,
    PAWN_REQUEST: 56,
    PAWN_WEAPON_COOLDOWN: 57,
    PAWN_LOCK_ACQUIRED: 58,
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
    INV_EQUIPMENT: 22,
    INV_UNDERBARREL_EQUIP: 23
};
const Settings = {
    INTERMISSION_TIMER: 10,
    MAX_CRATES: 10,
    MAX_ENEMIES: 10,
    MAX_DROPPED_WEAPONS: 8,
    VEHICLE_EXPLOSION_DAMAGE: 200
};
const CollisionGroups = {
    PAWN: Math.pow(2, 0),
    VEHICLE: Math.pow(2, 1),
    OBJECT: Math.pow(2, 2),
    GROUND: Math.pow(2, 3),
    PROJECTILE: Math.pow(2, 4),
    PLATFORM: Math.pow(2, 5)
};
const Material = {
    DEFAULT: "default",
    METAL: "metal",
    WOOD: "wood",
    WATER: "water",
    FLESH: "flesh",
    SANDBAG: "sandbag",
    GLASS: "glass"
};
const DamageType = {
    DAMAGE_BULLET: 1,
    DAMAGE_MELEE: 2,
    DAMAGE_EXPLOSIVE: 3,
    DAMAGE_FIRE: 4,
    DAMAGE_WORLD: 5
};
const BotSkill = {
    SKILL_EASY: 0,
    SKILL_NORMAL: 1,
    SKILL_HARD: 2,
    SKILL_INSANE: 3,
    SKILL_GOD: 4
};
const FeedItem = {
    TYPE_MESSAGE: "message",
    TYPE_KILL: "kill",
    TYPE_CHAT: "chat"
};
const Control = {
    LOOK: "look",
    INTERACT: "interact",
    RELOAD: "reload",
    SWITCH: "switch",
    GRENADE: "grenade",
    EQUIPMENT: "equipment",
    WEAPON: "weapon",
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
    JUMP: "jump",
    CROUCH: "crouch",
    SPRINT: "sprint",
    MELEE: "melee",
    FIRE: "fire",
    ITEM_1: "item_1",
    ITEM_2: "item_2",
    ITEM_3: "item_3",
};
const Rocket = {
    TYPE_DEFAULT: "TYPE_DEFAULT",
    TYPE_HELLFIRE: "TYPE_HELLFIRE",
    TYPE_NAPALM: "TYPE_NAPALM"
};
const Helicopter = {
    MH6: "mh6",
    COBRA: "cobra",
    OH58: "oh58",
    BLACKHAWK: "blackhawk",
    OSPREY: "osprey"
};
const Tank = {
    ABRAMS: "abrams",
    T90: "t90"
};
const Car = {
    QUAD: "quad"
};
const MountedWeapon = {
    M2_BROWNING: "m2",
    BGM71_TOW: "bgm71"
};
const Commands = {
    AMMO: 1,
    VEHICLE: 2,
    SUPPORT: 3
};
const Crate = {
    STORE: "CRATE_STORE",
    AMMO: "CRATE_AMMO",
    DECOY: "CRATE_DECOY",
    KILLSTREAK: "CRATE_KILLSTREAK",
    WEAPON: "CRATE_WEAPON",
    PERK: "CRATE_PERK",
    BOMB: "CRATE_BOMB",
    BOMB_GENERIC: "CRATE_BOMB_GENERIC",
    SHARD: "CRATE_SHARD",
    XP: "CRATE_XP",
    LIFE: "CRATE_LIFE"
};
const Weapon = {
    TYPE_MELEE: "TYPE_MELEE",
    TYPE_PISTOL: "TYPE_PISTOL",
    TYPE_MACHINE_PISTOL: "TYPE_MACHINE_PISTOL",
    TYPE_SMG: "TYPE_SMG",
    TYPE_SHOTGUN: "TYPE_SHOTGUN",
    TYPE_SNIPER: "TYPE_SNIPER",
    TYPE_DMR: "TYPE_DMR",
    TYPE_CARBINE: "TYPE_CARBINE",
    TYPE_RIFLE: "TYPE_RIFLE",
    TYPE_LMG: "TYPE_LMG",
    TYPE_LAUNCHER: "TYPE_LAUNCHER",
    TYPE_GRENADE: "TYPE_GRENADE",
    TYPE_EXPLOSIVE: "TYPE_EXPLOSIVE",
    TYPE_TACTICAL: "TYPE_TACTICAL",
    TYPE_WEAPON_TACTICAL: "TYPE_WEAPON_TACTICAL",
    MODE_AUTO: "MODE_AUTO",
    MODE_BURST: "MODE_BURST",
    MODE_SEMI: "MODE_SEMI"
};
const Mods = {
    TYPE_BASE: "base",
    TYPE_OPTIC: "optic",
    TYPE_AMMO: "ammo",
    TYPE_BARREL: "barrel",
    TYPE_ACCESSORY: "accessory",
    OPTIC_REFLEX: "reflex",
    OPTIC_EOTECH: "eotech",
    OPTIC_ACOG: "acog",
    BASE_DEADEYE: "base_marksman",
    BASE_RAPID_FIRE: "base_rapid_fire",
    BASE_LOCK_ON: "base_lock_on",
    BASE_DAMPER: "base_damper",
    BASE_SPEED: "base_speed",
    BASE_RANGE: "base_range",
    BASE_BURST_FIRE: "base_burst_fire",
    BASE_MODE_SELECTOR: "base_mode_selector",
    BASE_FULL_AUTO: "base_full_auto",
    BASE_SINGLE_FIRE: "base_single_fire",
    BASE_SHIELD_DAMAGE: "base_shield_damage",
    BASE_SHIELD_RAPID_FIRE: "base_shield_alloy",
    AMMO_FMJ: "ammo_fmj",
    AMMO_PIERCING: "ammo_ap",
    AMMO_IMPACT: "ammo_impact",
    AMMO_EXTENDED: "ammo_extended",
    AMMO_HOLLOW_POINT: "ammo_hollow_point",
    AMMO_STOPPING_POWER: "ammo_high_caliber",
    AMMO_LAUNCHER_RADIUS: "ammo_radius",
    AMMO_LAUNCHER_EXPLOSIVE: "ammo_explosive",
    AMMO_SLUG: "ammo_slug",
    AMMO_FRAG: "ammo_frag",
    GRENADE_SMOKE: "grenade_smoke",
    GRENADE_FLASH: "grenade_flash",
    ACCESSORY_MAG_ASSIST: "ammo_magpull",
    AMMO_SPEED_LOADER: "ammo_speed_loader",
    AMMO_HIGH_CALIBER: "ammo_range",
    AMMO_NAPALM: "ammo_napalm",
    BARREL_SILENCER: "barrel_silencer",
    BARREL_COMPENSATOR: "barrel_compensator",
    BARREL_BRAKE: "barrel_booster",
    BARREL_HEAVY: "barrel_range",
    ACCESSORY_LASER: "acc_laser",
    ACCESSORY_MARKER: "acc_marker",
    ACCESSORY_GRIP: "acc_grip", 
    ACCESSORY_GRIP_ANGLED: "acc_grip_angled", 
    ACCESSORY_M203: "acc_m203",
    ACCESSORY_M320: "acc_m320",
    ACCESSORY_GP25: "acc_gp25",
    ACCESSORY_MASTERKEY: "acc_masterkey"
};
const MatchState = {
    STATE_PRE_GAME: "pre_game",
    STATE_IN_PROGRESS: "in_progress",
    STATE_POST_ROUND: "post_round",
    STATE_POST_GAME: "post_game",
    END_RESULT_WIN: "end_result_win",
    END_RESULT_LOSS: "end_result_loss",
    END_RESULT_DRAW: "end_result_draw",
    END_CONDITION_TIME: "end_condition_time",
    END_CONDITION_SCORE: "end_condition_score",
    END_CONDITION_KIA: "end_condition_kia"
};
const GameMode = {
    DEATHMATCH: "deathmatch",
    TEAM_DEATHMATCH: "team_deathmatch",
    DOMINATION: "domination",
    CONQUEST: "conquest",
    CAPTURE_THE_FLAG: "capture_the_flag",
    SURVIVAL: "survival"
};
const Classes = {
    ASSAULT: "ASSAULT",
    ENGINEER: "ENGINEER",
    SUPPORT: "SUPPORT",
    RECON: "RECON",
};
const Character = {
    INDEX_MELEE: 2,
    INDEX_EQUIPMENT: 3,
    INDEX_GRENADE: 4,
    HAIR_COLOUR_BROWN: "HAIR_COLOUR_BROWN",
    HAIR_COLOUR_BROWN_LIGHT: "HAIR_COLOUR_BROWN_LIGHT",
    HAIR_COLOUR_BLACK: "HAIR_COLOUR_BLACK",
    HAIR_COLOUR_BLONDE: "HAIR_COLOUR_BLONDE",
    HAIR_COLOUR_GINGER: "HAIR_COLOUR_GINGER",
    HAIR_COLOUR_GREY: "HAIR_COLOUR_GREY",
    HAIR_COLOUR_WHITE: "HAIR_COLOUR_WHITE",
    HAIR_COLOUR_RED: "HAIR_COLOUR_RED",
    HAIR_COLOUR_BLUE: "HAIR_COLOUR_BLUE",
    HAIR_COLOUR_GREEN: "HAIR_COLOUR_GREEN",
    FACE_DEFAULT: "face0000",
    FACE_FEMALE: "face0009",
    FACE_ZOMBIE_1: "face0001",
    FACE_ZOMBIE_2: "face0002",
    FACE_ZOMBIE_3: "face0003",
    FACE_ZOMBIE_4: "face0004",
    FACE_ZOMBIE_FAT: "face0005",
    FACE_ZOMBIE_EXPLODER: "face0006",
    FACE_ZOMBIE_SPITTER: "face0007",
    FACE_ZOMBIE_SPITTER_BOSS: "face0007",
    FACE_ZOMBIE_SPRINTER: "face0008",
    FACE_INFESTOR: "face00012",
    FACE_ZOMBIE_SPRINTER_BOSS: "face0013",
    HAIR_SHORT: "hair0000",
    HAIR_BALD: "hair0008",
    HAIR_LONG: "hair0002",
    HAIR_PONYTAIL: "hair0003",
    HAIR_UNDERCUT: "hair0006",
    HAIR_SPIKES: "hair0005",
    HAIR_BUZZED: "hair0004",
    HAIR_FLAT: "hair0001",
    HAIR_STYLED: "hair0007",
    HAIR_HORSESHOE: "hair0009",
    HAIR_MOHAWK: "hair0010",
    BEARD_NONE: "beard0000",
    BEARD_STUBBLE: "beard0001",
    BEARD_FULL: "beard0002",
    BEARD_CIRCLE: "beard0003",
    BEARD_GOATEE: "beard0004",
    BEARD_MOUSTACHE: "beard0005",
    BEARD_SIDEBURNS: "beard0006",
    EYEWEAR_NONE: "eyewear0000",
    EYEWEAR_SHADES: "eyewear0001",
    EYEWEAR_GLASSES: "eyewear0002",
    EYEWEAR_GOGGLES_YELLOW: "eyewear0003",
    EYEWEAR_GOGGLES_ORANGE: "eyewear0004",
    EYEWEAR_GOGGLES_WHITE: "eyewear0005",
    EYEWEAR_GOGGLES_BLACK: "eyewear0006",
    FACEWEAR_NONE: "facewear0000",
    FACEWEAR_MASK: "facewear0001",
    FACEWEAR_SKULLMASK: "facewear0002",
    FACEWEAR_GHILLIE: "facewear0003",
    FACEWEAR_SCARF_OPFOR: "facewear0004",
    FACEWEAR_BALACLAVA: "facewear0005",
    FACEWEAR_SCARF_SPETSNAZ: "facewear0006",
    FACEWEAR_BANDANA: "facewear0007",
    FACEWEAR_GAS_MASK: "facewear0008",
    FACEWEAR_BANDANA_GENERIC: "facewear0009",
    FACEWEAR_GAITER: "facewear0010",
    FACEWEAR_TWOPLAYER: "facewear0019",
    HEAD_ERIC_HELMET: "head0082",
    HEAD_AETIC: "head0089",
    HEAD_NONE: "head0000",
    HEAD_MASK: "head0001",
    HEAD_GAS_MASK: "head0002",
    HEAD_RADIO: "head0003",
    HEAD_US_MASK: "head0004",
    HEAD_US_CAP: "head0005",
    HEAD_US_CAP_BACKWARDS: "head0006",
    HEAD_US_SPEC_OPS: "head0007",
    HEAD_US_HELMET: "head0008",
    HEAD_US_HELMET_TACTICAL: "head0009",
    HEAD_US_BOONIE: "head0010",
    HEAD_US_GHILLIE: "head0011",
    HEAD_GIGN_HELMET: "head0012",
    HEAD_GIGN_HELMET_2: "head0013",
    HEAD_GIGN_CAP: "head0014",
    HEAD_GSG9_HELMET: "head0015",
    HEAD_GSG9_HELMET_2: "head0016",
    HEAD_GSG9_HELMET_3: "head0017",
    HEAD_OPFOR_SCARF: "head0018",
    HEAD_OPFOR_HELMET: "head0019",
    HEAD_OPFOR_HELMET_2: "head0020",
    HEAD_OPFOR_BERET: "head0021",
    HEAD_OPFOR_SHADES: "head0022",
    HEAD_OPFOR_COMMANDER: "head0023",
    HEAD_RU_MASK: "head0024",
    HEAD_RU_HAT: "head0025",
    HEAD_RU_SCARF: "head0026",
    HEAD_RU_TOQUE: "head0027",
    HEAD_RU_BERET: "head0028",
    HEAD_RU_CAP: "head0029",
    HEAD_RU_RECON: "head0030",
    HEAD_RU_HELMET: "head0031",
    HEAD_MILITIA_RADIO: "head0032",
    HEAD_MILITIA_BAND: "head0033",
    HEAD_MILITIA_BANDANA: "head0034",
    HEAD_MILITIA_CAP: "head0035",
    HEAD_MILITIA_SNIPER: "head0036",
    HEAD_JUGGERNAUT_HELMET: "head0037",
    HEAD_RIOT_HELMET: "head0055",
    HEAD_RIOT_HELMET_VISOR_UP: "head0056",
    HEAD_UN_BERET: "head0057",
    HEAD_UN_HELMET: "head0058",
    HEAD_NIGHTVISION: "head0059",
    HEAD_ALTYN_HELMET: "head0060",
    HEAD_ALTYN_HELMET_VISOR_UP: "head0061",
    HEAD_HOOD: "head0062",
    HEAD_BALLISTIC_MASK_BLACK: "head0045",
    HEAD_BALLISTIC_MASK_WHITE: "head0046",
    BODY_VIP: "vip",
    BODY_AETIC: "aetic_1",
    BODY_AETIC_2: "aetic_2",
    BODY_HOSTAGE: "hostage",
    BODY_US_STANDARD: "us",
    BODY_US_GHILLIE: "us_ghillie",
    BODY_US_HEAVY: "us_heavy",
    BODY_US_PARA: "us_para",
    BODY_US_RECON: "us_recon",
    BODY_GIGN_STANDARD: "gign",
    BODY_GIGN_HEAVY: "gign_heavy",
    BODY_GIGN_PARA: "gign_para",
    BODY_GIGN_RECON: "gign_recon",
    BODY_GIGN_TACTICAL: "gign_tactical",
    BODY_GSG9_STANDARD: "gsg9",
    BODY_GSG9_HEAVY: "gsg9_heavy",
    BODY_GSG9_PARA: "gsg9_para",
    BODY_GSG9_RECON: "gsg9_recon",
    BODY_GSG9_TACTICAL: "gsg9_tactical",
    BODY_OPFOR_STANDARD: "opfor",
    BODY_OPFOR_ROCKETIER: "opfor_rocketier",
    BODY_OPFOR_HEAVY: "opfor_heavy",
    BODY_OPFOR_PARA: "opfor_para",
    BODY_OPFOR_RECON: "opfor_recon",
    BODY_RU_STANDARD: "ru",
    BODY_RU_BARE: "ru_bare",
    BODY_RU_HEAVY: "ru_heavy",
    BODY_RU_PARA: "ru_para",
    BODY_RU_RECON: "ru_recon",
    BODY_RU_ROCKETIER: "ru_rocketier",
    BODY_JUGGERNAUT: "juggernaut",
    BODY_MILITIA_STANDARD: "militia",
    BODY_MILITIA_HEAVY: "militia_heavy",
    BODY_MILITIA_PARA: "militia_para",
    BODY_MILITIA_RECON: "militia_recon",
    BODY_MILITIA_TACTICAL: "militia_tactical",
    BODY_US_KEVLAR: "us_kevlar",
    BODY_GIGN_KEVLAR: "gign_kevlar",
    BODY_GSG9_KEVLAR: "gsg9_kevlar",
    BODY_OPFOR_KEVLAR: "opfor_kevlar",
    BODY_RU_KEVLAR: "ru_kevlar",
    BODY_MILITIA_KEVLAR: "militia_kevlar",
    BODY_ZOMBIE: "zombie",
    BODY_ZOMBIE_2: "zombie_2",
    BODY_ZOMBIE_3: "zombie_3",
    BODY_ZOMBIE_FAT: "zombie_fat",
    BODY_ZOMBIE_EXPLODER: "zombie_exploder",
    BODY_ZOMBIE_EXPLODER_BOSS: "zombie_exploder_boss",
    BODY_ZOMBIE_SPITTER: "zombie_spitter",
    BODY_ZOMBIE_SPITTER_BOSS: "zombie_spitter_boss",
    BODY_ZOMBIE_SPRINTER: "zombie_sprinter",
    BODY_ZOMBIE_SPRINTER_BOSS: "zombie_sprinter_boss",
    BODY_C4_VEST: "c4_vest"
};

var p2;

class GameInstance
{
    init(_data, _onEventFunc)
    {
        console.log("Initializing game instance...");
        this.data = _data.data;
        this.lobbyId = _data.lobbyId;
        this.onEventFunc = _onEventFunc;
        this.batchData = [];
        var fps = _data.settings.tickRate != null ? Math.min(_data.settings.tickRate, 60) : 60;
        var settings = {
            fps: fps,
            gravity: _data.settings.gravity != null ? _data.settings.gravity : 600,
            restitution: 0.25,
            updateTimerMax: Math.round(fps / (_data.settings.updateRate != null ? _data.settings.updateRate : 60))
        };
        if (typeof p2 === "undefined")
        {
            p2 = this.data.p2;
        }
        this.game = {
            bPaused: false,
            bMultiplayer: _data.bMultiplayer,
            bRanked: true,
            bSurvival: false,
            bFriendlyFire: true,
            settings: settings,
            frameRate: 1 / 30,
            timestepMult: settings.fps / 60,
            fpsMult: settings.fps / 60,
            gameSettings: _data.settings,
            gameModeId: _data.gameModeId,
            mapId: _data.mapId,
            state: MatchState.STATE_PRE_GAME,
            players: [],
            gameModeData: {
                id: _data.gameModeId,
                timeLimit: _data.settings.timeLimit ? _data.settings.timeLimit * 60 : null,
                respawnTime: _data.settings.respawnTime,                
                bSpawnProtection: _data.settings.bSpawnProtection == true,
                bVehicles: _data.settings.bVehicles == true,
                bWeaponDrops: _data.settings.bWeaponDrops == true,
                vehicleRespawnTime: _data.settings.vehicleRespawnTime != null ? _data.settings.vehicleRespawnTime : 60,
                weaponRespawnTime: _data.settings.weaponRespawnTime != null ? _data.settings.weaponRespawnTime : 60,
                bAllowRespawns: true,
                bAllowRevives: false,
                bHardcore: _data.settings.bHardcore == true,
                bFallDamage: _data.settings.bFallDamage != null ? _data.settings.bFallDamage : true,
                bUnlimitedAmmo: _data.settings.bUnlimitedAmmo == true,
                bSwitchSeats: _data.settings.bSwitchSeats != null ? _data.settings.bSwitchSeats : true,
                spawns: [],
                factions: ["us", "ru"]
            },
            lobbyId: _data.lobbyId,
            preGameTimer: _data.settings.preGameTimer,
            gameTimer: 0,
            interval: null,
            timer_game: null,
            timer_preGame: null,
            world: new p2.World({
                gravity: [0, settings.gravity],
                broadphase: new p2.NaiveBroadphase(),
                islandSplit: true
            }),
            objects: {},
            spawners: [],
            toRemove: [],
            objectsToUpdate: null,
            updateTimer: 1,
            callbacks: this.data.callbacks
        }   
        this.game.world.sleepMode = p2.World.BODY_SLEEPING;
        this.game.world.defaultContactMaterial.friction = 0.5;
        this.game.world.on("beginContact", this.onBeginContact, this);
        this.game.world.solver.tolerance = 0.1; 
        this.game.world.solver.iterations = 2; 
        this.game.materials = {
            ground: new p2.Material()
        };        

        var map = this.getCurrentMapData();
        this.game.gameModeData.spawns = this.clone(map.spawns);
        this.game.gameModeData.scores = [0, 0];
        this.game.gameModeData.scoreLimit = _data.settings.scoreLimit;       

        switch (this.game.gameModeId)
        {
            case GameMode.DOMINATION:
                this.game.gameModeData.flags = [];
                for (var i = 0; i < 3; i++)
                {
                    this.game.gameModeData.flags.push(null);
                    this.createFlag(map.flags[this.game.gameModeId][i], { num: i });
                }
                break;
            case GameMode.CONQUEST:
                this.game.gameModeData.flags = [];
                for (var i = 0; i < 5; i++)
                {
                    this.game.gameModeData.flags.push(null);
                    this.createFlag(map.flags[this.game.gameModeId][i], { num: i });
                }
                break;
            case GameMode.SURVIVAL:                
                this.game.bRanked = false;
                this.game.bSurvival = true;
                this.game.bFriendlyFire = false;
                this.game.gameModeData.scores = null;
                this.game.gameModeData.bAllowRevives = true;
                this.game.gameModeData.timeLimit = null;
                this.game.gameModeData.bVehicles = false;
                this.game.gameModeData.bWeaponDrops = false;
                this.game.gameModeData.bAllowRespawns = false;
                this.game.gameModeData.wave = 0;
                this.game.gameModeData.enemies = 0;
                this.startSurvivalWaveIntermission();
                break;
        }

        this.initMap();
        this.generateMapNodes();

        this.onEvent({
            eventId: GameServer.EVENT_GAME_INIT,
            mapId: this.game.mapId,
            gameModeId: this.game.gameModeId,
            settings: this.game.settings
        });

        if (this.game.gameModeData.timeLimit)
        {
            this.game.gameTimer = this.game.gameModeData.timeLimit;
            this.game.timer_game = setInterval(this.onGameTimer.bind(this), 1000);
        }

        var players = _data.players;
        for (var i = 0; i < players.length; i++)
        {
            var ps = players[i];
            if (ps.bBot || !this.game.bMultiplayer)
            {
                this.addPlayer(ps);
            }
        }

        if (this.game.preGameTimer > 0)
        {
            this.game.timer_preGame = setInterval(this.onPreGameTimer.bind(this), 1000);
            this.onEvent({
                eventId: GameServer.EVENT_GAME_UPDATE,
                data: this.game.gameModeData
            });
            this.onEvent({
                eventId: GameServer.EVENT_GAME_PRE_TIMER,
                timer: this.game.preGameTimer
            });
        }
        else
        {
            this.game.state = MatchState.STATE_IN_PROGRESS;
            this.requestEvent({
                eventId: GameServer.EVENT_GAME_START,
                timer: this.game.gameTimer
            });
            this.onEvent({
                eventId: GameServer.EVENT_GAME_UPDATE,
                data: this.game.gameModeData
            });
        }

        this.game.interval = setInterval(this.tick.bind(this), 1000 / this.game.settings.fps);

        this.bInit = true;
    }

    destroy()
    {
        console.log("Destroy game");
        var game = this.game;
        if (game)
        {
            var world = game.world;
            if (world)
            {
                world.time = 0;
                world.fixedStepTime = 0;
                if (world.solver && world.solver.equations.length)
                {
                    world.solver.removeAllEquations();
                }
                var cs = world.constraints;
                for (var i = cs.length - 1; i >= 0; i--)
                {
                    world.removeConstraint(cs[i]);
                }
                var bodies = world.bodies;
                for (var i = bodies.length - 1; i >= 0; i--)
                {
                    world.removeBody(bodies[i]);
                }
                var springs = world.springs;
                for (var i = springs.length - 1; i >= 0; i--)
                {
                    world.removeSpring(springs[i]);
                }
                var cms = world.contactMaterials;
                for (var i = cms.length - 1; i >= 0; i--)
                {
                    world.removeContactMaterial(cms[i]);
                }
                world.off("beginContact", this.onBeginContact, this);
            }
            clearInterval(this.game.interval);
            delete this.game.interval;
            this.stopAllTimers();
            while (this.game.players.length > 0)
            {
                this.removePlayer(this.game.players[0].id);
            }            
            this.onEndCallback = null;
            this.batchData = null;
            if (this.game.graphInstance)
            {
                this.game.graphInstance.clear();
                this.game.graphInstance = null;
            }
            delete this.game.players;
            delete this.onEndCallback,
            //delete this.onEventFunc;
            delete this.game;
            delete this.lobbyId;
            delete this.data;
            this.bDestroyed = true;
        }
    }

    setEndCallback(_func)
    {
        this.onEndCallback = _func;
    }

    endGame()
    {
        if (this.bGameEnded)
        {
            return;
        }
        console.log("End game");
        this.bGameEnded = true;
        this.game.state = MatchState.STATE_POST_GAME;
        this.game.gameModeData.bAllowRespawns = false;
        this.stopAllTimers();
        var pawns = this.getPawns();
        for (var i = 0; i < pawns.length; i++)
        {
            var pawn = pawns[i];
            var data = pawn.data;
            if (data.bWantsToFire)
            {
                data.bWantsToFire = false;
            }
            switch (data.type)
            {
                case "helicopter":
                case "tank":
                case "car":
                case "mountedWeapon":
                    var weapons = data.weapons;
                    if (weapons)
                    {
                        for (var j = 0; j < weapons.length; j++)
                        {
                            var wpn = this.getVehicleWeapon(pawn, j);
                            if (wpn)
                            {
                                wpn.bWantsToFire = false;
                            }
                        }
                    }
                    break;
                case "character":
                    data.bWantsToMove = false;
                    break;

            }
        }
        if (this.onEndCallback)
        {
            this.onEndCallback.apply(this, [this.lobbyId]);
        }
    }

    tick()
    {
        try
        {
            this.update();
        }
        catch (e)
        {
            console.error(e);
            if (this.game && this.game.bMultiplayer)
            {
                this.endGame();
            }
            else
            {
                this.onEventFunc({
                    eventId: GameServer.EVENT_ERROR,
                    error: e
                });
            }
        }
    }

    update()
    {
        if (!this.game)
        {
            return;
        }
        if (this.game.bPaused)
        {
            this.game.resetCallTime = true;
        }
        else
        {
            for (var i = 0; i < this.game.players.length; i++)
            {
                var ps = this.game.players[i];
                var pawn = this.getObjectById(ps.id);
                if (ps.bBot)
                {
                    //Handle bots
                }
                if (this.game.gameModeData.bAllowRespawns)
                {
                    if (ps.timer_respawn != null && ps.bWaitingToRespawn)
                    {
                        if (ps.timer_respawn > 0)
                        {
                            ps.timer_respawn--;
                        }
                        else
                        {
                            this.onRespawnTimer(ps.id);
                        }
                    }
                }
                if (ps.multiKillTimer > 0)
                {
                    ps.multiKillTimer--;
                }
                else if (ps.multiKillTimer == 0)
                {
                    this.endMultiKill(ps);
                    ps.multiKillTimer = -1;
                }
                if (ps.avengerTimer > 0)
                {
                    ps.avengerTimer--;
                }
                else
                {
                    ps.avengerTimer = -1;
                }
                if (ps.timer_spawnProtection != null)
                {
                    if (ps.timer_spawnProtection > 0)
                    {
                        ps.timer_spawnProtection--;
                    }
                    else
                    {
                        this.onSpawnProtectionTimer(ps.id);
                    }
                }
                if (!pawn || !pawn.data.health)
                {
                    if (ps.bHasPawn)
                    {
                        ps.bHasPawn = false;
                        if (this.game.gameModeData.bAllowRespawns)
                        {
                            var bCanRespawn = ps.lives != null ? ps.lives > 0 : true;
                            if (bCanRespawn)
                            {
                                ps.bCanRespawn = false;
                                ps.bWaitingToRespawn = true;
                                if (ps.respawnTimer <= 0)
                                {
                                    if (ps.timer_respawn == null)
                                    {
                                        ps.respawnTimer = this.game.gameModeData.respawnTime;
                                        ps.timer_respawn = this.game.settings.fps;
                                    }
                                    this.onEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE,
                                        playerId: ps.id,
                                        data: {
                                            bCanRespawn: ps.bCanRespawn,
                                            bWaitingToRespawn: ps.bWaitingToRespawn,
                                            bHasPawn: ps.bHasPawn,
                                            respawnTimer: ps.respawnTimer
                                        }
                                    });
                                }
                            }
                        }
                        else
                        {
                            this.onEvent({
                                eventId: GameServer.EVENT_PLAYER_UPDATE,
                                playerId: ps.id,
                                data: {
                                    bHasPawn: ps.bHasPawn
                                }
                            });
                        }
                    }
                }
                else
                {
                    if (!ps.bHasPawn)
                    {
                        ps.bHasPawn = true;
                        if (this.game.gameModeData.bAllowRespawns)
                        {
                            ps.bWaitingToRespawn = false;
                        }
                        this.onEvent({
                            eventId: GameServer.EVENT_PLAYER_UPDATE,
                            playerId: ps.id,
                            data: {
                                bHasPawn: ps.bHasPawn,
                                bWaitingToRespawn: ps.bWaitingToRespawn
                            }
                        });
                    }
                }
            }

            if (this.game.bSurvival && this.matchInProgress())
            {
                var gameData = this.game.gameModeData;
                if (gameData.waveTimer > 0)
                {
                    gameData.waveTimer--;                    
                    if (gameData.waveTimer <= 0)
                    {                        
                        if (gameData.intermissionTimer >= 0)
                        {                           
                            gameData.intermissionTimer--;
                            this.onEvent({
                                eventId: GameServer.EVENT_GAME_UPDATE,
                                data: {
                                    timer: gameData.intermissionTimer
                                }
                            });
                            if (gameData.intermissionTimer == -1)
                            {
                                this.startSurvivalWave();
                            }
                            else
                            {
                                gameData.waveTimer = this.game.settings.fps;
                            }
                        }
                    }
                }
                else if (gameData.spawnTimer > 0)
                {
                    gameData.spawnTimer--;
                    if (gameData.spawnTimer <= 0)
                    {
                        if (gameData.enemiesSpawned < gameData.numEnemies)
                        {
                            var numOnTeam = this.getNumCharactersOnTeam(1);
                            console.log(numOnTeam);
                            if (numOnTeam < Settings.MAX_ENEMIES)
                            {
                                if (numOnTeam == 0)
                                {
                                    var heli = this.spawnSurvivalEnemyHelicopter();
                                    gameData.enemiesSpawned += heli.data.seats.length;
                                }
                                else
                                {
                                    this.spawnSurvivalEnemyCharacter();
                                    gameData.enemiesSpawned++;
                                }
                            }
                            gameData.spawnTimer = gameData.spawnTimerMax;
                        }
                    }
                }
            }

            if (this.matchInProgress())
            {
                var pawns = this.getCharacters().concat(this.getFlags());
                var spawnPoints = this.game.gameModeData.spawns;
                for (var i = 0; i < spawnPoints.length; i++)
                {
                    var spawn = spawnPoints[i];                      
                    for (var j = 0; j < pawns.length; j++)
                    {
                        var pawn = pawns[j];
                        var dist = this.Dist(spawn.position[0], spawn.position[1], pawn.position[0], pawn.position[1]);
                        if (dist < 600)
                        {
                            if (spawn.val == null)
                            {
                                spawn.val = 0;
                            }
                            spawn.val += pawn.data.team == 0 ? 1 : -1;
                        }
                    }                    
                    this.handleSpawn(spawn);
                }
            }
            if (!this.matchHasEnded())
            {
                for (var i = 0; i < this.game.spawners.length; i++)
                {
                    var spawner = this.game.spawners[i];
                    this.handleSpawner(spawner);
                }
            }

            var objects = this.game.world.bodies;
            for (i = 0; i < objects.length; i++)
            {
                var body = objects[i];
                var data = body.data; 
                if (!data)
                {
                    continue;
                }
                if (data.destroyTimer != null)
                {
                    data.destroyTimer--;
                    if (data.destroyTimer <= 0)
                    {
                        this.removeNextStep(body);
                    }
                }     
                if (data.exposeTimer > 0)
                {
                    data.exposeTimer--;
                    if (data.exposeTimer <= 0)
                    {
                        this.setDataValue(body, "bExposed", false);
                    }
                }    
                if (data.bStunned)
                {
                    if (data.stunTimer > 0)
                    {
                        data.stunTimer--;
                    }
                    else
                    {
                        data.bStunned = false;
                        this.onEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_STUN,
                            bValue: false
                        });
                    }
                }
                if (data.bFlashed)
                {
                    if (data.flashTimer > 0)
                    {
                        data.flashTimer--;
                    }
                    else
                    {
                        data.flashIntensity = null;
                        data.bFlashed = false;
                        this.onEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_FLASH,
                            bValue: false
                        });
                    }
                }
                if (data.bRegenHealth && data.health > 0)
                {
                    var regenThreshold = data.maxHealth * (data.regenThreshold != null ? data.regenThreshold : 1);
                    if (data.health < regenThreshold)
                    {
                        if (data.regenTimer == 0)
                        {
                            var regenAmount = data.regenAmount ? data.regenAmount : 1;
                            data.health = Math.min(data.maxHealth, data.health + regenAmount);
                            this.pushObjectDataUpdate(data.id, ["health"]);
                            if (data.damagedBy)
                            {
                                delete data.damagedBy;
                            }
                        }
                        else
                        {
                            data.regenTimer--;
                        }
                    }
                }

                switch (data.type)
                {
                    case "reviver":
                        this.handleReviver(body);
                        break;
                    case "door":
                        this.handleDoor(body);
                        break;
                    case "character":
                        this.handleCharacter(body);
                        if (data.bBot && this.matchInProgress())
                        {
                            this.handleAICharacter(body);
                        }
                        break;
                    case "helicopter":
                        this.handleHelicopter(body);
                        break;
                    case "tank":
                        this.handleTank(body);
                        break;
                    case "car":
                        this.handleCar(body);
                        break;
                    case "mountedWeapon":
                        this.handleMountedWeapon(body);
                        break;
                    case "rocket":
                        this.handleRocket(body);
                        break;
                    case "grenade":
                        this.handleGrenade(body);
                        break;
                    case "equipment":
                        this.handleEquipment(body);
                        break;
                    case "obstacle":
                        if (data.detonationTimer > 0)
                        {
                            data.detonationTimer--;
                            if (data.detonationTimer <= 0)
                            {
                                this.detonate(body);
                            }
                        }
                        break;
                    case "flag":
                        if (this.matchInProgress())
                        {
                            this.handleFlag(body);
                        }
                        break;
                    default:
                        if (body.position[1] > this.getCurrentMapData().height)
                        {
                            console.warn("Out of bounds", data.type);
                            this.removeNextStep(body);
                        }
                        break;
                }

                if (!data.bSkipServerUpdate)
                {
                    if (!this.game.objectsToUpdate)
                    {
                        this.game.objectsToUpdate = {};
                    }
                    var toUpdate = this.game.objectsToUpdate;
                    var id = data.id;
                    if (!toUpdate[id])
                    {
                        toUpdate[id] = [];
                    }
                    var arr = toUpdate[id];
                    var objData = {}; //this.clone(data);
                    objData.id = id;
                    objData.position = this.RoundNumberArray(body.position);
                    objData.velocity = this.clone(body.velocity);
                    objData.rotation = body.angle;
                    if (data.bOnGround != null)
                    {
                        objData.bOnGround = data.bOnGround;
                    }
                    if (data.bWantsToMove != null)
                    {
                        objData.bWantsToMove = data.bWantsToMove;
                    }
                    if (data.lookPos != null)
                    {
                        objData.lookPos = data.lookPos;
                    }
                    if (data.desiredAimRotation != null)
                    {
                        objData.desiredAimRotation = data.desiredAimRotation;
                    }
                    if (this.isVehicle(body))
                    {
                        var weapons = data.weapons;
                        if (weapons)
                        {
                            objData.weapons = [];
                            for (var j = 0; j < weapons.length; j++)
                            {
                                objData.weapons[j] = [];
                                var weaponList = weapons[j]; //this.getVehicleWeapon(body, j);
                                for (var k = 0; k < weaponList.length; k++)
                                {
                                    var curWeapon = weaponList[k];
                                    if (curWeapon)
                                    {
                                        objData.weapons[j][k] = {
                                            aimRotation: curWeapon.aimRotation
                                        }
                                        if (curWeapon.weaponData && curWeapon.weaponData.overheatMax)
                                        {
                                            objData.weapons[j][k].overheat = curWeapon.overheat;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    arr.push(objData);
                }
            }

            if (this.game.updateTimer == 1)
            {
                if (this.game.objectsToUpdate)
                {
                    var ids = Object.keys(this.game.objectsToUpdate);
                    var tmp = {};
                    var numIds = ids.length;
                    for (i = 0; i < numIds; i++)
                    {
                        var curObjectId = ids[i];
                        var objectUpdates = this.game.objectsToUpdate[curObjectId];

                        //Save last object data for next batch update
                        tmp[curObjectId] = objectUpdates[objectUpdates.length - 1].data;

                        //Check duplicate keys in object data
                        if (objectUpdates.length == this.game.settings.updateTimerMax)
                        {
                            var newArr = [];
                            for (var j = 0; j < objectUpdates.length; j++)
                            {
                                var curUpdate = objectUpdates[j];
                                var targetData = null;
                                var newUpdate = null;
                                if (j > 0)
                                {
                                    targetData = objectUpdates[j - 1].data;
                                }
                                else
                                {
                                    //Should check against tmp object's last element
                                    var prevObjectData = this.game.prevObjectData;
                                    if (prevObjectData)
                                    {
                                        targetData = prevObjectData[curUpdate.id];
                                    }
                                }
                                if (targetData)
                                {
                                    var newData = null; //this.removeDuplicateKeys(curUpdate.data, targetData);
                                    if (newData)
                                    {
                                        var newUpdate = this.clone(curUpdate);
                                        newUpdate.data = newData;
                                        newArr.push(newUpdate);
                                    }
                                }
                                if (!newUpdate)
                                {
                                    this.optimize(curUpdate);
                                    newArr.push(curUpdate);
                                }
                            }
                            if (newArr)
                            {
                                this.game.objectsToUpdate[curObjectId] = newArr;
                            }
                        }
                        else
                        {
                            //this.log("First object update for " + curObjectId);
                        }
                    }
                    this.onEvent({
                        eventId: GameServer.EVENT_OBJECT_UPDATE,
                        objects: this.game.objectsToUpdate
                    });
                    this.game.prevObjectData = tmp;
                    delete this.game.objectsToUpdate;
                }
                this.game.updateTimer = this.game.settings.updateTimerMax;
            }
            else
            {
                this.game.updateTimer--;
            }      

            var world = this.game.world;
            var timeSinceLastCall = 0;
            var timeMilliseconds = Date.now();
            if (this.game.resetCallTime)
            {
                timeSinceLastCall = 0;
                this.game.resetCallTime = false;
            }
            else
            {
                if (timeMilliseconds !== undefined && this.game.lastTimeMilliseconds !== undefined)
                {
                    timeSinceLastCall = (timeMilliseconds - this.game.lastTimeMilliseconds) / 1000;
                }
            }
            world.step(this.game.frameRate, timeSinceLastCall, 10);
            this.game.lastTimeMilliseconds = timeMilliseconds;

            while (this.game.toRemove.length > 0)
            {
                this.removeObject(this.game.toRemove[0]);
                this.game.toRemove.splice(0, 1);
            }
        }     
        //this.sendBatchData();
    }

    removeDuplicateKeys(_source, _target)
    {
        if (_source && _target)
        {
            var newData = {};
            var sourceKeys = Object.keys(_source);
            for (var i = 0; i < sourceKeys.length; i++)
            {
                var sourceKey = sourceKeys[i];
                var sourceValue = _source[sourceKey];
                if (typeof sourceValue === "boolean")
                {
                    sourceValue = sourceValue ? 1 : 0;
                }
                else if (typeof sourceValue === "number" && sourceValue % 1 != 0)
                {
                    sourceValue = this.RoundDecimal(sourceValue);
                }
                switch (sourceKey)
                {
                    default:
                        var target = _target[sourceKey];
                        if (typeof target === "boolean")
                        {
                            target = target ? 1 : 0;
                        }
                        if (target !== sourceValue)
                        {
                            newData[sourceKey] = sourceValue;
                        }
                        break;
                }
            }
            if (newData)
            {
                return newData;
            }
        }
        else
        {
            console.warn("removeDuplicateKeys: Invalid source or target reference");
        }
        return null;
    }

    generateMapNodes() 
    {
        console.log("Generating map nodes...");
        var map = this.getCurrentMapData();
        var nodes = map.nodes;
        var links = map.links;
        if (nodes && links)
        {
            var createGraph = this.data.graph;
            if (createGraph)
            {
                var graph = createGraph();
                this.game.graphInstance = graph;
                for (var i = 0; i < nodes.length; i++)
                {
                    var node = nodes[i];
                    graph.addNode(node.id, node.data);
                }
                for (var i = 0; i < links.length; i++)
                {
                    var link = links[i];
                    if (!link.bDisabled)
                    {
                        graph.addLink(link.source, link.target);
                    }
                }
                this.game.graph = graph;
                var path = this.data.path;
                var pathfinder = path.aStar(graph);
                this.game.pathfinder = pathfinder;
            }
            else
            {
                console.warn("Invalid graph reference!");
            }
        }
        else
        {
            if (!nodes)
            {
                console.warn("Missing node data!");
            }
            if (!links)
            {
                console.warn("Missing link data!");
            }
        }
    }

    setPathLinkDisabled(_id, _bDisabled)
    {
        var map = this.getCurrentMapData();
        var links = map.links;
        for (var i = 0; i < links.length; i++)
        {
            var link = links[i];
            if (link.id == _id)
            {
                link.bDisabled = _bDisabled;                
                break;
            }
        }
    }

    getClosestNode(_position)
    {
        if (_position)
        {
            var map = this.getCurrentMapData();
            var nodes = map.nodes;
            if (nodes)
            {
                var arr = [];
                for (var i = 0; i < nodes.length; i++)
                {
                    var node = nodes[i];
                    var bLOS = this.checkLineOfSight(_position, node.data.position);
                    var dist = this.Dist(_position[0], _position[1], node.data.position[0], node.data.position[1]);
                    arr.push({
                        node: node,
                        dist: dist,
                        bLOS: bLOS
                    });
                }
                if (arr.length === 0)
                {
                    return null;
                }
                arr.sort(function (a, b)
                {
                    if (a.bLOS < b.bLOS) return 1;
                    if (a.bLOS > b.bLOS) return -1;
                    if (a.dist < b.dist) return -1;
                    if (a.dist > b.dist) return 1;
                    return 0;
                });
                return arr[0].node;
            }
        }
        return null;
    }

    getAIBestDominationFlag(_body)
    {
        var data = _body.data;
        var flags = this.getFlags();
        var curFlag = null;
        var dist = Number.MAX_VALUE;
        var bFlag = false;
        for (var i = 0; i < flags.length; i++)
        {
            var flag = flags[i];
            if (flag.data.team != data.team)
            {
                var flagDist = this.Dist(_body.position[0], _body.position[1], flag.position[0], flag.position[1]);
                if (flagDist < dist)
                {
                    bFlag = true;
                    curFlag = flag;
                    dist = flagDist;
                }
            }
        }
        if (!bFlag)
        {
            return flags[this.Random(0, flags.length - 1)];
        }
        return curFlag;
    }

    getAIVehicePath(_start, _destination, _body)
    {
        if (_start && _destination)
        {
            var graph = this.game.graph;
            var pathfinder = this.game.pathfinder;
            if (graph && pathfinder)
            {
                var fromNode = this.getClosestNode(_start);
                var toNode = this.getClosestNode(_destination);
                if (fromNode && toNode)
                {
                    var foundPath = pathfinder.find(fromNode.id, toNode.id);
                    if (foundPath)
                    {
                        if (foundPath.length > 0)
                        {
                            foundPath.reverse();
                            foundPath.splice(0, 1);
                            foundPath.push({
                                data: {
                                    position: _destination,
                                    type: "node_dest",
                                    threshold: _destinationThreshold
                                }
                            });
                        }
                        else
                        {
                            console.warn("Empty path!", fromNode.id, toNode.id, this.getCurrentMapData().id);
                        }
                        return foundPath;
                    }
                    else
                    {
                        console.warn("Invalid path!");
                    }
                }
                else
                {
                    if (!fromNode)
                    {
                        console.warn("Invalid fromNode!");
                    }
                    if (!toNode)
                    {
                        console.warn("Invalid toNode!");
                    }
                }
            }
            else
            {
                if (!graph)
                {
                    console.warn("Invalid graph reference!");
                }
                if (!pathfinder)
                {
                    console.warn("Invalid pathfinder reference!");
                }
            }
        }
        return null;
    }

    getAIPath(_start, _destination, _body, _destinationThreshold)
    {
        if (_start && _destination)
        {
            var graph = this.game.graph;
            var pathfinder = this.game.pathfinder;
            if (graph && pathfinder)
            {
                var fromNode = this.getClosestNode(_start);
                var toNode = this.getClosestNode(_destination);
                if (fromNode && toNode)
                {
                    var foundPath = pathfinder.find(fromNode.id, toNode.id);
                    if (foundPath)
                    {
                        if (foundPath.length > 0)
                        {
                            foundPath.reverse();
                            var node = foundPath[0];
                            if (node.data.type == "node_climb")
                            {
                                var data = _body.data;
                                if (!data.bClimbing && !data.controllableId)
                                {
                                    var nextNode = foundPath[1];
                                    if (nextNode && nextNode.data.position[1] < (_body.position[1] - 100))
                                    {
                                        var ladder = this.getObjectById(node.data.ladderId);
                                        if (ladder)
                                        {
                                            this.startLadderClimb(_body, ladder);
                                        }
                                    }
                                }
                            }
                            foundPath.splice(0, 1);
                            foundPath.push({
                                data: {
                                    position: _destination,
                                    type: "node_dest",
                                    threshold: _destinationThreshold
                                }
                            });
                        }
                        else
                        {
                            console.warn("Empty path!", fromNode.id, toNode.id, this.getCurrentMapData().id);
                        }
                        return foundPath;
                    }
                    else
                    {
                        console.warn("Invalid path!");
                    }
                }
                else
                {
                    if (!fromNode)
                    {
                        console.warn("Invalid fromNode!");
                    }
                    if (!toNode)
                    {
                        console.warn("Invalid toNode!");
                    }
                }
            }
            else
            {
                if (!graph)
                {
                    console.warn("Invalid graph reference!");
                }
                if (!pathfinder)
                {
                    console.warn("Invalid pathfinder reference!");
                }
            }
        }
        return null;
    }

    initMap()
    {
        var map = this.getCurrentMapData();     

        var groundMask = CollisionGroups.PAWN | CollisionGroups.VEHICLE | CollisionGroups.OBJECT | CollisionGroups.PROJECTILE; 
        var leftBody = new p2.Body({
            angle: (3 * Math.PI) / 2
        });
        leftBody.data = {
            id: "bounds_left",
            type: "ground",
            bSkipServerUpdate: true
        };
        leftBody.addShape(new p2.Plane({
            collisionGroup: CollisionGroups.GROUND,
            collisionMask: groundMask
        }));
        this.addWorldBody(leftBody);
        var rightBody = new p2.Body({
            angle: Math.PI / 2,
            position: [map["width"], 0]
        });
        rightBody.data = {
            id: "bounds_right",
            type: "ground",
            bSkipServerUpdate: true
        };
        rightBody.addShape(new p2.Plane({
            collisionGroup: CollisionGroups.GROUND,
            collisionMask: groundMask
        }));
        this.addWorldBody(rightBody);

        var objects = map.objects;
        for (var i = 0; i < objects.length; i++)
        {
            var object = objects[i];
            switch (object.type)
            {
                case "polygon":
                    var mapBody = new p2.Body({
                        mass: 0,
                        position: object.position
                    });
                    mapBody.allowSleep = true;
                    var cg = CollisionGroups.GROUND;
                    var cm = CollisionGroups.PAWN | CollisionGroups.PROJECTILE | CollisionGroups.VEHICLE | CollisionGroups.OBJECT;
                    var pType = "ground";
                    if (object.bPlatform)
                    {
                        cg = CollisionGroups.PLATFORM;
                        cm = CollisionGroups.PAWN;
                        pType = "platform";
                    }
                    this.loadPolygon(object.spriteId, mapBody, object.width, object.height, 1, {
                        material: new p2.Material(),
                        collisionGroup: cg,
                        collisionMask: cm
                    });
                    mapBody.data = {
                        id: "map",
                        type: pType,
                        bSkipServerUpdate: true
                    };
                    this.addWorldBody(mapBody);
                    break;

                case "ground":
                    var body = new p2.Body({
                        mass: 0,
                        position: object.position,
                        angle: object.rotation != null ? this.ToRad(object.rotation) : 0
                    });
                    body.allowSleep = true;
                    body.data = {
                        id: this.getRandomUniqueId(),
                        type: object.type,
                        material: object.material,
                        bSkipServerUpdate: true
                    };
                    body.addShape(new p2.Box({
                        width: object.width,
                        height: object.height,
                        collisionGroup: CollisionGroups.GROUND,
                        collisionMask: groundMask                        
                    }));
                    this.addWorldBody(body);
                    break;

                case "platform":
                    var body = new p2.Body({
                        mass: 0,
                        position: object.position,
                        angle: object.rotation != null ? this.ToRad(object.rotation) : 0
                    });
                    body.allowSleep = true;
                    body.data = {
                        id: this.getRandomUniqueId(),
                        type: object.type,
                        material: object.material,
                        bSkipServerUpdate: true
                    };
                    body.addShape(new p2.Box({
                        width: object.width,
                        height: object.height,
                        collisionGroup: CollisionGroups.PLATFORM,
                        collisionMask: groundMask
                    }));
                    this.addWorldBody(body);
                    break;

                case "ladder":
                    var body = new p2.Body({
                        mass: 0,
                        position: object.position
                    });
                    body.allowSleep = true;
                    body.data = {
                        id: object.id,
                        type: object.type,
                        width: 10,
                        height: object.height,
                        direction: object.direction,
                        bSkipServerUpdate: true
                    };
                    var shape = new p2.Box({
                        width: object.width,
                        height: object.height,
                    });
                    shape.sensor = true;
                    body.addShape(shape);
                    this.addWorldBody(body);
                    break;

                case "helicopter":
                    if (this.game.gameModeData.bVehicles)
                    {
                        this.createSpawner(object.position, {
                            type: object.type,
                            timerMax: Math.max(1, this.game.settings.fps * this.game.gameModeData.vehicleRespawnTime),
                            data: {
                                type: object.heliType,
                                team: object.team,
                                scale: object.scale
                            }
                        });
                    }
                    break;

                case "tank":
                    if (this.game.gameModeData.bVehicles)
                    {
                        this.createSpawner(object.position, {
                            type: object.type,
                            timerMax: Math.max(1, this.game.settings.fps * this.game.gameModeData.vehicleRespawnTime),
                            data: {
                                type: object.tankType,
                                team: object.team,
                                scale: object.scale
                            }
                        });
                    }
                    break;

                case "car":
                    if (this.game.gameModeData.bVehicles)
                    {
                        this.createSpawner(object.position, {
                            type: object.type,
                            timerMax: this.game.settings.fps * this.game.gameModeData.vehicleRespawnTime,
                            data: {
                                type: object.carType,
                                team: object.team,
                                scale: object.scale
                            }
                        });
                    }
                    break;

                case "mountedWeapon":
                    if (this.game.gameModeData.bVehicles)
                    {
                        this.createSpawner(object.position, {
                            type: object.type,
                            timerMax: this.game.settings.fps * this.game.gameModeData.vehicleRespawnTime,
                            data: {
                                weaponType: object.weaponType,
                                team: object.team,
                                scale: object.scale
                            }
                        });
                    }
                    break;

                case "droppedWeapon":
                    if (this.game.gameModeData.bWeaponDrops)
                    {
                        this.createSpawner(object.position, {
                            type: object.type,
                            timerMax: this.game.settings.fps * this.game.gameModeData.weaponRespawnTime,
                            data: {
                                scale: object.scale,
                                weaponId: object.weaponId
                            }
                        });
                    }
                    break;

                case "obstacle":
                    this.createObstacle(object);
                    break;

                case "door":
                    this.createDoor(object);
                    break;

                case "crate":
                    this.createCrate(object.position, object);
                    break;

                case "lever":
                    this.createLever(object.position, object);
                    break;

                case "window":
                    this.createWindow(object);
                    break;
            }
        }
    }

    applyAABBBuoyancyForces(body, planePosition, k, c)
    {
        for (var i = 0; i < body.shapes.length; i++)
        {
            var shape = body.shapes[i];
            // Get shape world transform
            body.vectorToWorldFrame(shapePosition, shape.position);
            p2.vec2.add(shapePosition, shapePosition, body.position);
            shapeAngle = shape.angle + body.angle;
            // Get shape AABB
            shape.computeAABB(aabb, shapePosition, shapeAngle);
            var areaUnderWater;
            if (aabb.upperBound[1] < planePosition[1])
            {
                // Fully submerged
                p2.vec2.copy(centerOfBouyancy, shapePosition);
                areaUnderWater = shape.area;
            }
            else if (aabb.lowerBound[1] < planePosition[1])
            {
                // Partially submerged
                var width = aabb.upperBound[0] - aabb.lowerBound[0];
                var height = 0 - aabb.lowerBound[1];
                areaUnderWater = width * height;
                p2.vec2.set(centerOfBouyancy, aabb.lowerBound[0] + width / 2, aabb.lowerBound[1] + height / 2);
            }
            else
            {
                continue;
            }
            // Compute lift force
            p2.vec2.subtract(liftForce, planePosition, centerOfBouyancy);
            p2.vec2.scale(liftForce, liftForce, areaUnderWater * k);
            liftForce[0] = 0;
            // Make center of bouycancy relative to the body
            p2.vec2.subtract(centerOfBouyancy, centerOfBouyancy, body.position);
            // Viscous force
            body.getVelocityAtPoint(v, centerOfBouyancy);
            p2.vec2.scale(viscousForce, v, -c);
            // Apply forces
            body.applyForce(viscousForce, centerOfBouyancy);
            body.applyForce(liftForce, centerOfBouyancy);
        }
    }

    vehicleHasOccupant(_body)
    {
        var seats = _body.data.seats;
        for (var i = 0; i < seats.length; i++)
        {
            if (seats[i].pawnId)
            {
                return true;
            }
        }
        return false;
    }

    canExitVehicle(_body)
    {
        if (!_body)
        {
            return false;
        }
        return !_body.data.vehicleCooldown && !_body.data.seatTimer;
    }

    canEnterVehicle(_body, _vehicle)
    {
        if (this.vehicleHasOccupant(_vehicle))
        {
            var seats = _vehicle.data.seats;
            if (seats)
            {
                for (var i = 0; i < seats.length; i++)
                {
                    var seat = seats[i];
                    if (seat.pawnId)
                    {
                        var pawn = this.getObjectById(seat.pawnId);
                        if (pawn && pawn.data.team != _body.data.team)
                        {
                            return false;
                        }
                    }
                }
            }
        }
        return !_body.data.vehicleCooldown;
    }

    enterVehicle(_char, _vehicle, _seatIndex)
    {             
        if (!_vehicle.data.health)
        {
            return;
        }
        var seats = _vehicle.data.seats;
        if (seats)
        {
            this.setDataValue(_vehicle, "team", _char.data.team);
            switch (_vehicle.data.type)
            {
                case "car":
                    _vehicle.shapes[0].collisionGroup = CollisionGroups.OBJECT;
                    _vehicle.shapes[0].collisionMask = CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.PAWN | CollisionGroups.OBJECT;
                    break;
                case "helicopter":
                    _vehicle.gravityScale = 0;
                    break;
            }   
            _char.data.seatIndex = _seatIndex;
            var seatData = seats[_seatIndex];
            seatData.pawnId = _char.data.id;
            if (seatData.bInvisible)
            {
                this.setDataValue(_char, "bInvisible", true);
            }
            _char.gravityScale = 0;
            _char.velocity = [0, 0];
            _char.shapes[0].collisionMask = CollisionGroups.PROJECTILE;
            _char.data.bWantsToMove = false;
            _char.data.bSprinting = false;
            _char.data.controllableId = _vehicle.data.id;
            _char.data.vehicleCooldown = this.game.settings.fps;
            this.cancelCharacterBoltPull(_char);
            this.cancelCharacterReload(_char);  
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: _char.data.id,
                type: GameServer.PAWN_VEHICLE_ENTER,
                vehicleId: _vehicle.data.id,
                scale: _vehicle.data.scale,
                seatIndex: _seatIndex,
                seat: seats[_seatIndex]
            });
            var weapons = _vehicle.data.weapons;
            if (weapons)
            {
                var ps = this.getPlayerById(_char.data.id);
                if (ps)
                {
                    if (ps.vehicles)
                    {                        
                        var playerVehicleData = ps.vehicles[_vehicle.data.vehicleId];
                        if (playerVehicleData)
                        {
                            this.setDataValue(_vehicle, "camo", playerVehicleData.camo);
                            this.setDataValue(_vehicle, "countermeasure", playerVehicleData.countermeasure);
                            if (playerVehicleData.weapons)
                            {
                                var newData = this.getWeaponData(playerVehicleData.weapons[_seatIndex]);
                                if (newData)
                                {
                                    var weapon = this.getVehicleWeapon(_vehicle, _seatIndex); //weapons[_seatIndex];
                                    if (weapon)
                                    {
                                        if (!weapon.weaponData || weapon.weaponData.id != newData.id)
                                        {
                                            weapon.weaponData = newData;
                                            this.initVehicleWeapon(weapon);
                                            this.requestEvent({
                                                eventId: GameServer.EVENT_PAWN_ACTION,
                                                pawnId: _vehicle.data.id,
                                                type: GameServer.PAWN_VEHICLE_UPDATE,
                                                index: _seatIndex,
                                                weapon: weapon
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.vehicleHasOccupant(_vehicle))
        {
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: _vehicle.data.id,
                type: GameServer.PAWN_VEHICLE_ENTER,
                seatIndex: _seatIndex
            });
        }
        this.pushObjectDataUpdate(_vehicle.data.id, ["seats"]);
        this.setPlayerControllable(_char.data.id, _vehicle);
    }

    initVehicleWeapon(_weapon)
    {
        var weapon = _weapon;
        if (weapon)
        {
            if (!weapon.weaponData.overheatMax)
            {
                weapon.weaponData.overheatMax = 180;
            }
            if (weapon.weaponData.type == Weapon.TYPE_LMG)
            {
                weapon.weaponData.cooldownNum = 2;
            }
            if (weapon.weaponData.ammoMax)
            {
                weapon.ammo = weapon.weaponData.ammoMax;
            }
            else
            {
                weapon.ammo = null;
            }
            weapon.bCooldown = false;
            weapon.aimRotation = 0;
            weapon.overheat = 0;
        }
    }

    exitVehicle(_char, _bEject)
    {
        if (!_char)
        {
            return;
        }
        var vehicle = this.getObjectById(_char.data.controllableId);
        if (vehicle)
        {            
            var seats = vehicle.data.seats;
            if (seats)
            {
                var seat = seats[_char.data.seatIndex];
                if (seat)
                {
                    if (seat.pawnId)
                    {
                        var pawn = this.getObjectById(seat.pawnId);
                        if (pawn)
                        {
                            pawn.data.controllableId = null;
                        }
                        delete seat.pawnId;
                    }                   
                }
                this.setDataValue(_char, "bInvisible", false);
                _char.gravityScale = 1;
                _char.angle = 0;                
                _char.velocity = [0, 0];
                _char.shapes[0].collisionMask = CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT;
                _char.data.vehicleCooldown = this.game.settings.fps;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: _char.data.id,
                    type: GameServer.PAWN_VEHICLE_LEAVE,
                    bEject: _bEject
                });
            }
            this.pushObjectDataUpdate(vehicle.data.id, ["seats"]);
            switch (vehicle.data.type)
            {
                case "car":
                    if (!this.vehicleHasOccupant(vehicle))
                    {
                        vehicle.shapes[0].collisionGroup = CollisionGroups.VEHICLE;
                        vehicle.shapes[0].collisionMask = CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT;
                    }
                    break;
                case "helicopter":
                    if (!this.vehicleHasOccupant(vehicle) || !vehicle.data.seats[0].pawnId)
                    {
                        vehicle.gravityScale = 1;
                        vehicle.wakeUp();
                    }
                    break;
            }
            if (!this.vehicleHasOccupant(vehicle))
            {
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: vehicle.data.id,
                    type: GameServer.PAWN_VEHICLE_LEAVE
                });
                this.setDataValue(vehicle, "team", -1);
            }
        }
    }

    triggerCountermeasure(_char)
    {
        if (_char.data.seatTimer)
        {
            return;
        }
        var vehicle = this.getObjectById(_char.data.controllableId);
        if (vehicle)
        {
            if (!vehicle.data.bCountermeasureCooldown)
            {
                var cm = vehicle.data.countermeasure;
                var cooldown = 60;
                switch (cm)
                {
                    case "ejection_seat":
                        cooldown = 10;
                        this.clearPlayerControllable(_char.data.id, true);
                        if (_char.data.bBot)
                        {
                            _char.velocity = [0, this.getSharedData("character").ejectionVelocity];
                        }
                        break;
                    case "ecm":
                        this.setDataValue(vehicle, "bECM", true);
                        vehicle.data.ecmTimer = this.game.settings.fps * 15;
                        break;
                    case "flares":
                        cooldown = 30;
                        for (var i = 0; i < 5; i++)
                        {
                            this.createRocket({
                                x: vehicle.position[0],
                                y: vehicle.position[1],
                                type: Rocket.TYPE_DEFAULT,
                                team: vehicle.data.team,
                                playerId: vehicle.data.id,
                                causerId: vehicle.data.id,
                                angle: this.ToRad(-90) + this.ToRad(this.Random(-45, 45)),
                                weaponId: "rocket_flare",
                                damage: 0,
                                radius: 100,
                                gravityScale: 1
                            });
                        }
                        break;
                }
                this.setDataValue(vehicle, "bCountermeasureCooldown", true);
                vehicle.data.countermeasureCooldownTimer = this.game.settings.fps * cooldown;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: vehicle.data.id,
                    type: GameServer.PAWN_VEHICLE_UPDATE,
                    bUseCountermeasure: true,
                    cooldown: vehicle.data.countermeasureCooldownTimer
                });
            }
        }
    }

    getCurrentMapData() 
    {
        return this.getMapData(this.game.mapId);
    }

    getCharacterSpeedMultiplier(_body)
    {       
        var data = _body.data;
        var mult = data.speedMultiplier * data.baseSpeedMultiplier;
        if (data.bStoppingPower)
        {
            mult *= this.getSharedData("character").stoppingPowerMult;
        }
        return mult;
    }

    handleAICharacter(_body)
    {
        var data = _body.data;
        if (!data.health)
        {
            return;
        }
        var ai = _body.ai;
        if (ai.ticker > 0)
        {
            ai.ticker--;
        }
        else
        {
            ai.tickerMax = Math.round(this.game.settings.fps * 0.5);
            ai.ticker = ai.tickerMax;
            switch (ai.botSkill)
            {
                case BotSkill.SKILL_GOD:
                    ai.enemyDistMax = 3000;
                    ai.offsetX = 0;
                    ai.offsetY = 0;
                    break;
                case BotSkill.SKILL_INSANE:
                    ai.enemyDistMax = 2000;
                    ai.offsetX = this.Random(-30, 30);
                    ai.offsetY = this.Random(-30, 30);
                    break;
                case BotSkill.SKILL_HARD:
                    ai.enemyDistMax = 1000;
                    ai.offsetX = this.Random(-75, 75);
                    ai.offsetY = this.Random(-75, 75);
                    break;
                case BotSkill.SKILL_NORMAL:
                    ai.enemyDistMax = 750;
                    ai.offsetX = this.Random(-100, 100);
                    ai.offsetY = this.Random(-100, 100);
                    break;
                default:
                    ai.enemyDistMax = 500;
                    ai.offsetX = this.Random(-150, 150);
                    ai.offsetY = this.Random(-150, 150);
                    break;
            }
        }        

        if (data.bFlashed || data.bStunned)
        {
            data.bWantsToFire = false;
        }
        if (ai.enemy && !ai.enemy.data)
        {
            delete ai.enemy;
        }
        if (ai.ticker == 0)
        {
            var enemySettings = {};
            if (_body.data.controllableId)
            {
                var veh = this.getObjectById(_body.data.controllableId);
                var wpn = this.getVehicleWeapon(veh, _body.data.seatIndex);
                if (wpn && wpn.weaponData && wpn.weaponData.bAirOnly)
                {
                    enemySettings.pawnTypes = [
                        "helicopter",
                        "tank",
                        "car"
                    ];
                }
            }
            var enemy = this.getNearestEnemyPawn(_body, enemySettings);
            data.lockOnTargetId = enemy ? enemy.data.id : null;
            if (enemy)
            {
                ai.enemy = enemy;                
                ai.bEnemyLOS = this.checkLineOfSight(_body.position, enemy.position, false, enemy);
                ai.enemyDist = this.Dist(enemy.position[0], enemy.position[1], _body.position[0], _body.position[1]);
                ai.enemyDistMult = ai.enemyDist / ai.enemyDistMax;
                if (enemy.data.bECM)
                {
                    data.lockOnTargetId = null;
                }
            }
            else
            {
                delete ai.enemy;
                delete ai.bEnemyLOS;
                delete ai.enemyDist;
            }
            if (ai.actionTicker > 0)
            {
                ai.actionTicker--;
            }
            else
            {
                ai.actionTicker = ai.actionTickerMax;
                ai.bWantsVehicle = !_body.data.controllableId && this.Random(1, 4) == 1 && (this.getVehicles().length > 0);
                ai.desiredVehicleId = null;
                if (ai.bWantsVehicle)
                {
                    if (!this.game.bSurvival || data.team == 0)
                    {
                        this.setPawnRequest(_body, Commands.VEHICLE);
                    }
                }
            }
            if (ai.pathTicker > 0)
            {
                ai.pathTicker--;
            }
            else
            {
                if (!_body.data.bClimbing)
                {
                    ai.path = this.getAIPath([_body.position[0], _body.position[1]], ai.moveToPos, _body, ai.destThreshold);
                }
                var pathTickerMax = 0;
                switch (ai.botSkill)
                {
                    case BotSkill.SKILL_EASY:
                        pathTickerMax = 3;
                        break;
                    case BotSkill.SKILL_NORMAL:
                    case BotSkill.SKILL_HARD:
                        pathTickerMax = 2;
                        break;
                    case BotSkill.SKILL_INSANE:
                    case BotSkill.SKILL_GOD:
                        pathTickerMax = 1;
                        break;
                    default:
                        pathTickerMax = 5;
                        break;
                }
                ai.pathTicker = pathTickerMax;
            }
            if (this.hasEquipment(_body, "ammo_box"))
            {
                var req = this.getNearbyRequest(_body, Commands.AMMO);
                if (req)
                {
                    this.useCharacterEquipment(_body, "equipment", req[0], req[1]);
                }
            }
        }

        //Handle inventory
        var bestIndex = this.getBestInventoryIndex(_body, ai.enemy, ai.enemyDist);
        if (bestIndex != data.currentInventoryIndex)
        {
            this.requestEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                pawnId: data.id,
                type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                value: bestIndex
            });
        }

        //Handle equipment
        var equipment = data.equipment;
        if (equipment && equipment.ammo > 0)
        {
            switch (equipment.id)
            {
                case "stim":
                    if (data.health < (data.maxHealth * 0.75))
                    {
                        this.useCharacterEquipment(_body, "equipment", _body.position[0], _body.position[1]);
                    }
                    break;

                case "jammer":
                case "sensor":
                    if (ai.enemy && ai.enemyDist < equipment.radius)
                    {
                        this.useCharacterEquipment(_body, "equipment", ai.enemy.position[0], ai.enemy.position[1]);
                    }
                    break;
            }
        }

        var moveDirX = 0;
        var moveDirY = 0;
        var bMovingBack = false;
        if (ai.path)
        {
            var node = ai.path[0];
            if (node && node.data)
            {
                if (!data["bClimbing"] && !data["bLadderCooldown"])
                {
                    var endNode = ai.path[ai.path.length - 1];
                    if (ai["ticker"] % 10 == 0)
                    {
                        var bHasEndNodeLOS = this.checkLineOfSight(_body.position, node.data.position);
                    }
                    if (bHasEndNodeLOS)
                    {
                        var distToEndNode = this.Dist(_body.position[0], _body.position[1], endNode.data.position[0], endNode.data.position[1]);
                        if (distToEndNode < ai.destThreshold && bHasEndNodeLOS)
                        {
                            var bWithinEndNode = true;
                        }
                    }
                }
                if (bWithinEndNode)
                {
                    ai["path"] = [];
                }
                else
                {
                    var nodeThreshold = (node.data.threshold ? node.data.threshold : 30);
                    if (data["bClimbing"] || data["bLadderCooldown"])
                    {
                        nodeThreshold = 10;
                    }
                    var nodeDist = this.Dist(node.data.position[0], node.data.position[1], _body.position[0], _body.position[1]);
                    if (nodeDist >= nodeThreshold)
                    {
                        if (Math.abs(node.data.position[0] - _body.position[0]) > 5)
                        {
                            if (node.data.position[0] < _body.position[0])
                            {
                                moveDirX = -1;
                            }
                            else
                            {
                                moveDirX = 1;
                            }
                        }
                        if (!data["bClimbing"])
                        {
                            var bShouldClimb = true;
                            if (bShouldClimb)
                            {
                                if (node.data.position[1] > _body.position[1] + 100)
                                {
                                    if (data["bOnGround"] && !data["bLadderCooldown"])
                                    {
                                        var ladder = this.getClimbableLadder(_body);
                                        if (ladder)
                                        {
                                            this.startLadderClimb(_body, ladder);
                                        }
                                    }
                                }
                            }
                        }
                        if (data.bClimbing)
                        {
                            if (node.data.position[1] < (_body.position[1] + 70))
                            {
                                moveDirY = -1;
                            }
                            else if (node.data.position[1] > (_body.position[1] + 100))
                            {
                                moveDirY = 1;
                            }
                            else
                            {
                                this.leaveLadder(_body);
                            }
                        }
                    }
                    else
                    {
                        //Node reached
                        switch (node.data.type)
                        {
                            case "node_jump":
                                this.triggerCharacterJump(_body);
                                break;

                            case "node_climb":
                                var bShouldClimb = true;
                                if (bShouldClimb)
                                {
                                    var nextNode = ai["path"][1];
                                    if (nextNode && nextNode.data.position[1] < (_body.position[1] - 10))
                                    {
                                        var ladder = this.getObjectById(node.data.ladderId);
                                        if (ladder)
                                        {
                                            this.startLadderClimb(_body, ladder);
                                        }
                                    }
                                }
                                break;
                        }
                        ai["path"].splice(0, 1);
                    }
                }
                if (ai["path"].length === 0)
                {
                    if (!ai["bCamp"])
                    {
                        if (ai["investigatePos"])
                        {
                            delete ai["investigatePos"];
                            delete ai["investigatePriority"];
                        }
                        if (ai["returnPos"])
                        {
                            delete ai["returnPos"];
                        }
                    }
                    if (ai["bPatrol"] && ai["patrolPoints"])
                    {
                        ai.patrolPoints.push(ai.patrolPoints.shift());
                    }
                }
            }
        }
        switch (moveDirY)
        {
            case 1:
                this.handlePlayerInput(_body, {
                    keyId: Control.DOWN,
                    value: true
                });
                break;
            case -1:
                this.handlePlayerInput(_body, {
                    keyId: Control.UP,
                    value: true
                });
                break;
        }
        data.moveX = moveDirX;
        data.bWantsToMove = moveDirX != 0;
        if (ai.enemy && ai.enemy.data)
        {            
            switch (ai.enemy.data.type)
            {
                case "character":
                    data.lookPos = [ai.enemy.position[0], ai.enemy.position[1] + 10];
                    if (ai.botSkill >= BotSkill.SKILL_HARD)
                    {
                        data.lookPos[1] = ai.enemy.position[1] - 8;
                    }
                    break;
                default:
                    data.lookPos = [ai.enemy.position[0], ai.enemy.position[1]];
                    break;
            }        
            if (ai.offsetX)
            {
                data.lookPos[0] += ai.offsetX * ai.enemyDistMult;
                data.lookPos[1] += ai.offsetY * ai.enemyDistMult;
            }
            if (ai.enemy.data.type == "character" && ai.enemyDist < data.melee.range && !ai.bFireCooldown)
            {
                this.triggerCharacterMeleeAttack(_body);
            }
        }    
        if (ai.botSkill >= BotSkill.SKILL_HARD)
        {
            this.setDataValue(_body, "bSprinting", !data.bWantsToFire && data.bWantsToMove && this.characterCanSprint(_body));
            this.setDataValue(_body, "bCrouching", !data.bWantsToMove && !data.bClimbing && !data.bSprinting && !data.bParachute && this.characterCanCrouch(_body));
        }

        ai.destThreshold = 30;
        if (data.controllableId)
        {
            ai.desiredVehicleId = null;
            var desiredVehicle = this.getObjectById(data.controllableId);
            if (desiredVehicle)
            {
                if (desiredVehicle.data.seats.length > 1 && data.seatIndex != 0)
                {
                    if (!desiredVehicle.data.seats[0].pawnId)
                    {                        
                        this.switchSeats(_body);
                    }
                }
            }
        }
        else
        {
            var req = this.getNearbyRequest(_body, Commands.SUPPORT, 1000);
            if (req)
            {
                ai.moveToPos = req;
                ai.desiredVehicleId = null;
            }
            else if (ai.desiredVehicleId)
            {
                var desiredVehicle = this.getObjectById(ai.desiredVehicleId);
                if (!desiredVehicle || !this.hasAvailableSeat(desiredVehicle))
                {
                    ai.desiredVehicleId = null;
                    ai.moveToPos = null;
                }
                else
                {
                    ai.desiredVehicleId = desiredVehicle.data.id;
                    ai.moveToPos = this.clone(desiredVehicle.position);
                }
            }
            else
            {
                ai.moveToPos = null;
                ai.desiredVehicleId = null;
                if (ai.bWantsVehicle)
                {
                    desiredVehicle = this.getNearbyVehicle(_body);
                    if (desiredVehicle)
                    {
                        ai.desiredVehicleId = desiredVehicle.data.id;
                    }
                }
            }
        }

        if (!ai.moveToPos)
        {
            switch (this.game.gameModeId)
            {
                case GameMode.HEADQUARTERS:
                case GameMode.DOMINATION:
                case GameMode.CONQUEST:
                    var flag = this.getAIBestDominationFlag(_body);
                    if (flag)
                    {
                        ai.destThreshold = 100;
                        ai.moveToPos = this.clone(flag.position);
                    }
                    break;
                default:
                    if (ai.enemy)
                    {
                        ai.moveToPos = this.clone(ai.enemy.position);
                    }
                    break;
            }
        }

        var bTriggerFire = ai.enemyDist < ai.lookRange && ai.bEnemyLOS && (!data.bStunned && !data.bFlashed);

        this.triggerCharacterWeapon({
            eventId: GameServer.EVENT_PLAYER_TRIGGER_WEAPON,
            playerId: data.id,
            value: this.hasInventoryAmmo(_body) && bTriggerFire,
            worldPosition: data.lookPos
        });

        if (ai.bFireCooldown)
        {
            if (ai.fireCooldownTimer > 0)
            {
                ai.fireCooldownTimer--;
            }
            else
            {
                ai.bFireCooldown = false;
                ai.fireCooldownTimer = ai["fireCooldownTimerMax"];
            }
        }
        else
        {
            if (ai["fireBurstTimer"] > 0)
            {
                ai["fireBurstTimer"]--;
            }
            else
            {
                ai.bFireCooldown = true;
                ai["fireBurstTimer"] = ai["fireBurstTimerMax"];
            }
        }
        if (data.bWantsToFire)
        {
            if (!ai.bFireCooldown)
            {
                bTriggerFire = true;
                var curWeapon = data.inventory[data.currentInventoryIndex];
                if (curWeapon["fireMode"] == Weapon.MODE_SEMI)
                {
                    if (ai["semiCooldownTimer"] == 0)
                    {
                        ai["semiCooldownTimer"] = ai["semiCooldownTimerMax"];
                        bTriggerFire = true;
                    }
                    else
                    {
                        ai["semiCooldownTimer"]--;
                        bTriggerFire = false;
                    }
                }
                data.bWantsToFire = bTriggerFire;
                if (data["bWantsToFire"])
                {
                    var weapon = data["weapon"];
                    weapon["bFireHandler"] = true;
                }
            }
            else
            {
                data.bWantsToFire = false;
            }
        }
        else
        {
            data.bWantsToFire = false;
        }

        if (data.controllableId)
        {
            var controllable = this.getObjectById(data.controllableId);
            if (controllable)
            {
                switch (controllable.data.type)
                {
                    case "tank":
                    case "helicopter":
                    case "car":
                    case "mountedWeapon":
                        if (data.seatIndex == 0 && controllable.data.type != "mountedWeapon")
                        {
                            if (!this.game.bSurvival || data.team == 0)
                            {
                                var req = this.getNearbyRequest(_body, Commands.VEHICLE, 1500);
                            }
                            if (req && this.hasAvailableSeat(controllable))
                            {
                                var desiredPos = req;
                            }
                            else if (ai.enemy)
                            {
                                switch (ai.enemy.data.type)
                                {
                                    case "helicopter":
                                        desiredPos = [ai.enemy.position[0], ai.enemy.position[1]];
                                        break;
                                    default:
                                        if (controllable.data.type == "helicopter")
                                        {
                                            desiredPos = [ai.enemy.position[0], Math.min(1600, ai.enemy.position[1] - 500)];
                                        }
                                        else
                                        {
                                            desiredPos = [ai.enemy.position[0], ai.enemy.position[1]];
                                        }
                                        break;
                                }
                                desiredPos[1] = Math.max(500, desiredPos[1]);                                
                            }
                            if (desiredPos)
                            {
                                var keyInfo = {};
                                var dist = this.Dist(desiredPos[0], desiredPos[1], controllable.position[0], controllable.position[1]);
                                switch (controllable.data.type)
                                {
                                    case "car":
                                        var threshold = 50;
                                        break;
                                    case "tank":
                                        threshold = 1000;
                                        break;
                                    default:
                                        threshold = 500;
                                        break;
                                }
                                this.setVehicleScale(controllable, desiredPos[0] < controllable.position[0] ? -1 : 1);
                                if (dist > threshold)
                                {                                    
                                    if (desiredPos[0] < controllable.position[0])
                                    {
                                        keyInfo[Control.LEFT] = true;
                                    }
                                    else
                                    {
                                        keyInfo[Control.RIGHT] = true;
                                    }
                                    if (desiredPos[1] < controllable.position[1])
                                    {
                                        keyInfo[Control.UP] = true;
                                    }
                                    else
                                    {
                                        keyInfo[Control.DOWN] = true;
                                    }
                                }
                                else
                                {
                                    if (desiredPos[0] < controllable.position[0])
                                    {
                                        keyInfo[Control.RIGHT] = true;
                                    }
                                    else
                                    {
                                        keyInfo[Control.LEFT] = true;
                                    }
                                }
                                if (Object.keys(keyInfo).length > 0)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_INPUT,
                                        playerId: data.id,
                                        keyInfo: keyInfo
                                    });
                                }
                            }
                        }
                        if (controllable.data.weapons)
                        {
                            var weapon = this.getVehicleWeapon(controllable, data.seatIndex); //controllable.data.weapons[data.seatIndex];
                            if (weapon && weapon.weaponData && weapon.weaponData.damage > 0)
                            {
                                weapon.bWantsToFire = ai.bEnemyLOS && ai.enemyDist < ai.lookRange;
                                if (weapon.weaponData.bAirOnly && !this.isVehicle(ai.enemy) && ai.botSkill < BotSkill.SKILL_INSANE)
                                {
                                    weapon.bWantsToFire = false;
                                }
                                if (ai.enemy)
                                {
                                    var muzzle = this.getVehicleMuzzlePosition(controllable, data.seatIndex);
                                    var aim = [ai.enemy.position[0], ai.enemy.position[1]];
                                    if (controllable.data.type == "tank" && _body.data.seatIndex == 0)
                                    {
                                        aim[0] += (ai.offsetX * ai.enemyDistMult) * 0.25;
                                        aim[1] += (ai.offsetY * ai.enemyDistMult) * 0.25;
                                    }
                                    else
                                    {
                                        aim[0] += ai.offsetX * ai.enemyDistMult;
                                        aim[1] += ai.offsetY * ai.enemyDistMult;
                                    }
                                    var rad = this.Angle(muzzle[0], muzzle[1], aim[0], aim[1]);
                                    this.setVehicleWeaponAimRotation(controllable.data.scale, weapon, rad);
                                }
                            }
                        }
                        break;
                }
            }
        }
        else
        {
            if (!data.bOnGround && _body.velocity[1] > 600)
            {
                this.deployParachute(_body);
            }
            if (ai.bInteract && ai.ticker == 0)
            {
                var interactable = this.getBestInteractable(_body);
                if (interactable)
                {
                    this.startInteraction(_body, interactable);
                }
            }
        }

        if (data.lookPos)
        {
            data.desiredAimRotation = this.Angle(_body.position[0], _body.position[1], data.lookPos[0], data.lookPos[1]);
        }
    }

    getBestInventoryIndex(_body, _enemyPawn, _enemyDist)
    {
        var data = _body.data;
        var inventory = data["inventory"];
        var bestIndex = data["currentInventoryIndex"];
        var bestValue = 0;
        for (var i = 0; i < inventory.length; i++)
        {
            var item = inventory[i];
            if (item)
            {
                var damage = item.damage;
                if (item.type == Weapon.TYPE_LAUNCHER)
                {
                    damage *= 0.5;
                }
                var itemValue = damage * item.magSize;
                if (item["mag"] > 0 || item["ammo"] > 0 || data.weapon["bUnlimitedAmmo"])
                {
                    //var enemyState = _enemyPawn ? this.getPlayerById(_enemyPawn.data["id"]) : null;
                    if (_enemyPawn && (this.isVehicle(_enemyPawn) || _enemyPawn.data.controllableId))
                    {
                        if (item.bRocket)
                        {
                            bestIndex = i;
                        }
                    }
                    else
                    {
                        if (_enemyPawn && _enemyDist < 500 && item.type == Weapon.TYPE_SHOTGUN)
                        {
                            bestIndex = i;
                        }
                        else if (_enemyPawn && _enemyDist < 200 && item.id == "riot_shield")
                        {
                            bestIndex = i;
                        }
                        else if (itemValue > bestValue && !item["bAirOnly"])
                        {
                            bestIndex = i;
                            bestValue = itemValue;
                        }
                    }
                }
            }
        }
        return bestIndex;
    }

    setVehicleWeaponAimRotation(_scale, _weapon, _val)
    {
        if (_weapon)
        {
            var val = _val;
            if (isNaN(val))
            {
                val = 0;
            }
            /*
            if (_weapon.minAngle != null)
            {
                if (_scale == 1)
                {
                    val = Math.max(_weapon.minAngle, val);
                }
                else
                {
                    var rad = this.WrapAngle(_weapon.minAngle - this.ToRad(180));
                    val = Math.max(rad, val);
                }
            }
            if (_weapon.maxAngle != null)
            {
                if (_scale == 1)
                {
                    val = Math.min(_weapon.maxAngle, val);
                }
                else
                {
                    val = Math.min(_weapon.maxAngle - this.ToRad(180), val);
                }
            }
            */
            if (_weapon.weaponData && _weapon.weaponData.bRocket)
            {
                _weapon.aimRotation = val;
            }
            else
            {
                var rad = this.WrapAngle(_weapon.aimRotation - _val, true);
                _weapon.aimRotation -= rad * 0.25;
            }
        }
    }

    hasEquipment(_body, _id)
    {
        var data = _body.data;
        return data.equipment && data.equipment.id == _id && data.equipment.ammo > 0;
    }

    hasInventoryAmmo(_body)
    {
        var data = _body.data;
        var inventory = data.inventory;
        for (var i = 0; i < inventory.length; i++)
        {
            var item = inventory[i];
            if (item.mag > 0 || item.ammo > 0)
            {
                return true;
            }
        }
        if (data.weapon.bUnlimitedAmmo)
        {
            return true;
        }
        return false;
    }

    getNearestFriendlyPawn(_pawn, _settings)
    {
        var pawns = this.getPawns();
        var pawn = null;
        var bLOS = false;
        var lastDist = Number.MAX_VALUE;
        var pawnTypes = null;
        var scale = undefined;
        var bPlayerOnly = false;
        var bInjured = false;
        if (_settings)
        {
            if (_settings["bLOS"] != undefined)
            {
                bLOS = _settings["bLOS"];
            }
            if (_settings["maxRange"] != undefined)
            {
                lastDist = _settings["maxRange"];
            }
            if (_settings["pawnTypes"] != undefined)
            {
                pawnTypes = _settings["pawnTypes"];
            }
            if (_settings["scale"] != undefined)
            {
                scale = _settings["scale"];
            }
            if (_settings["bPlayerOnly"] != undefined)
            {
                bPlayerOnly = _settings["bPlayerOnly"];
            }
            if (_settings["bInjured"] != undefined)
            {
                bInjured = _settings["bInjured"];
            }
        }
        for (var i = 0; i < pawns.length; i++)
        {
            var curPawn = pawns[i];
            if (curPawn.data["health"] && curPawn.data.team == _pawn.data.team)
            {
                if (curPawn.data.id == _pawn.data.id)
                {
                    continue;
                }
                if (bPlayerOnly && curPawn.data["bBot"])
                {
                    continue;
                }
                if (bInjured && curPawn.data["health"] >= curPawn.data["maxHealth"])
                {
                    continue;
                }
                if (pawnTypes)
                {
                    if (pawnTypes.indexOf(curPawn.data["type"]) < 0)
                    {
                        continue;
                    }
                }
                if (scale != undefined)
                {
                    if (scale > 0)
                    {
                        if (curPawn.position[0] < _pawn.position[0])
                        {
                            continue;
                        }
                    }
                    else if (scale < 0)
                    {
                        if (curPawn.position[0] > _pawn.position[0])
                        {
                            continue;
                        }
                    }
                }
                if (bLOS)
                {
                    if (!this.checkLineOfSight(_pawn.position, curPawn.position))
                    {
                        continue;
                    }
                }
                if (curPawn.data["type"] == "helicopter")
                {
                    if (curPawn.data["bPendingRemoval"])
                    {
                        continue;
                    }
                }
                var dist = this.Dist(_pawn.position[0], _pawn.position[1], curPawn.position[0], curPawn.position[1]);
                if (dist < lastDist)
                {
                    lastDist = dist;
                    pawn = curPawn;
                }
            }
        }
        return pawn;
    }

    getNearestEnemyPawn(_pawn, _settings)
    {
        var pawns = this.getPawns();
        var bLOS = true;
        var bPreferDistance = false;
        var bIgnoreOutOfSight = false;
        var bAllTypes = false;
        var pawnTypes = null;
        var scale = undefined;
        var maxRange = Number.MAX_VALUE;
        var bLockOn = false;
        if (_settings)
        {
            if (_settings["bLOS"] != undefined)
            {
                bLOS = _settings["bLOS"];
            }
            if (_settings["maxRange"] != undefined)
            {
                maxRange = _settings["maxRange"];
            }
            if (_settings["pawnTypes"] != undefined)
            {
                pawnTypes = _settings["pawnTypes"];
            }
            if (_settings["scale"] != undefined)
            {
                scale = _settings["scale"];
            }
            if (_settings["bPreferDistance"] != undefined)
            {
                bPreferDistance = _settings["bPreferDistance"];
            }
            if (_settings["bIgnoreOutOfSight"] != undefined)
            {
                bIgnoreOutOfSight = _settings["bIgnoreOutOfSight"];
            }
            if (_settings["bAllTypes"] != undefined)
            {
                bAllTypes = _settings["bAllTypes"];
            }
            if (_settings.bLockOn != undefined)
            {
                bLockOn = _settings.bLockOn;
            }
        }
        var enemies = [];
        for (var i = 0; i < pawns.length; i++)
        {
            var curPawn = pawns[i];
            var bLOS = true;
            var fallback = 0;
            if (curPawn.data.bUntargetable || curPawn.data.bInvisible || curPawn.data.bSpawnProtection)
            {
                continue;
            }
            if (curPawn.data.health && curPawn.data.team != _pawn.data.team)
            {
                var dist = this.Dist(_pawn.position[0], _pawn.position[1], curPawn.position[0], curPawn.position[1]);
                if (pawnTypes)
                {
                    if (pawnTypes.indexOf(curPawn.data.type) == -1)
                    {
                        if (bAllTypes)
                        {
                            fallback = 1;
                        }
                        else
                        {
                            continue;
                        }
                    }
                }
                if (scale != null)
                {
                    if (scale > 0)
                    {
                        if (curPawn.position[0] < _pawn.position[0])
                        {
                            continue;
                        }
                    }
                    else if (scale < 0)
                    {
                        if (curPawn.position[0] > _pawn.position[0])
                        {
                            continue;
                        }
                    }
                }
                if (bLockOn)
                {
                    if (curPawn.data.bECM)
                    {
                        continue;
                    }
                }
                if (this.isCharacter(curPawn))
                {
                    if (curPawn.data.controllableId)
                    {       
                        var veh = this.getObjectById(curPawn.data.controllableId);
                        if (veh.data.type == "tank" || veh.data.type == "helicopter")
                        {
                            continue;
                        }
                    }
                }
                else if (this.isVehicle(curPawn))
                {
                    if (!curPawn.data.health)
                    {
                        continue;
                    }
                    else if (!this.vehicleHasOccupant(curPawn))
                    {
                        continue;
                    }
                }
                if (bLOS)
                {
                    var bObstaclesBlock = true;
                    if (dist > 100)
                    {
                        var bCheck = this.checkLineOfSight(_pawn.position, curPawn.position, bObstaclesBlock);
                        if (!bCheck)
                        {
                            if (bIgnoreOutOfSight)
                            {
                                continue;
                            }
                            else
                            {
                                //Pawn out of sight, but add to enemies array if no other enemies
                                bLOS = false;
                            }
                        }
                    }
                }
                if (dist <= maxRange)
                {
                    var enemy = {
                        type: curPawn.data.type,
                        pawn: curPawn,
                        fallback: fallback,
                        dist: dist,
                        bLOS: bLOS
                    };
                    enemies.push(enemy);
                }
            }
        }
        if (enemies.length > 0)
        {
            if (bPreferDistance)
            {
                enemies.sort(function (a, b)
                {
                    if (a.fallback < b.fallback) return -1;
                    if (a.fallback > b.fallback) return 1;
                    if (a.dist < b.dist) return -1;
                    if (a.dist > b.dist) return 1;
                    if (a.bLOS < b.bLOS) return 1;
                    if (a.bLOS > b.bLOS) return -1;
                    return 0;
                });
            }
            else
            {
                enemies.sort(function (a, b)
                {
                    if (a.bLOS < b.bLOS) return 1;
                    if (a.bLOS > b.bLOS) return -1;
                    if (a.dist < b.dist) return -1;
                    if (a.dist > b.dist) return 1;
                    return 0;
                });
            }
            return enemies[0].pawn;
        }
        return null;
    }

    setDataValue(_body, _key, _value)
    {
        var data = _body.data;
        var prev = data[_key];
        data[_key] = _value;
        if (prev !== data[_key])
        {
            this.pushObjectDataUpdate(data.id, [_key]);
        }
    }

    pushObjectDataUpdate(_id, _keys)
    {
        var obj = this.getObjectById(_id);
        if (obj)
        {
            var newData = {
                id: _id
            };
            for (var i = 0; i < _keys.length; i++)
            {
                var key = _keys[i];
                newData[key] = obj.data[key];
            }
            this.onEvent({
                eventId: GameServer.EVENT_OBJECT_UPDATE,
                object: newData
            });
        }
    }

    checkLineOfSight(_startPos, _endPos, _bObstaclesBlock, _targetBody)
    {
        var result = this.raycast(_startPos[0], _startPos[1], _endPos[0], _endPos[1]);
        if (result)
        {
            if (result.length == 0)
            {
                return true;
            }
            else
            {
                for (var i = 0; i < result.length; i++)
                {
                    var cur = result[i].body;
                    if (cur === _targetBody)
                    {
                        return true;
                    }
                    if (cur.data)
                    {
                        switch (cur.data.type)
                        {
                            case "ground":
                                return false;
                            case "obstacle":
                                if (_bObstaclesBlock) return false;
                                break;
                            case "door":
                                if (_bObstaclesBlock) return false;
                                if (cur.data.bClosed) return false;
                                break;
                        }
                    }
                }
            }
        }
        return true;
    }

    handleFlag(_body)
    {
        var data = _body.data;
        var charsTouching;
        var chars = this.getCharacters();
        for (var i = 0; i < chars.length; i++)
        {
            var char = chars[i];
            var bOverlap = _body.getAABB().overlaps(char.getAABB());
            if (bOverlap)
            {
                if (!charsTouching)
                {
                    charsTouching = {};
                }
                if (!charsTouching[char.data.team])
                {
                    charsTouching[char.data.team] = [];
                }
                charsTouching[char.data.team].push(char.data["id"]);
            }
        }
        var prevCaptureTimer = this.clone(data.captureTimer);
        //var prevTouching = data.charsTouching ? data.charsTouching.length : 0;
        var prevTouching = [0, 0];
        if (data.charsTouching)
        {
            prevTouching[0] = data.charsTouching[0] != null ? data.charsTouching[0].length : 0;
            prevTouching[1] = data.charsTouching[1] != null ? data.charsTouching[1].length : 0;
        }
        var bWasBeingCaptured = data["bIsBeingCaptured"];
        var bWasContested = data["bIsContested"];
        var prevCapturingTeam = data["capturingTeam"];
        var prevTeam = data.team;
        data["charsTouching"] = charsTouching;
        data["bIsBeingCaptured"] = false;
        data["bIsContested"] = false;
        data["capturingTeam"] = null;
        if (charsTouching)
        {
            var keys = Object.keys(charsTouching);
            if (keys.length == 1)
            {
                var team = parseInt(keys[0]);
                if (team != data.team)
                {
                    data["bIsBeingCaptured"] = true;
                    data["capturingTeam"] = team;
                    if (data.captureTimer[team] > 0)
                    {
                        data.captureTimer[team] -= Math.min(charsTouching[team].length, 4);

                        for (var i = 0; i < charsTouching[team].length; i++)
                        {
                            var char = this.getObjectById(charsTouching[team][i]);
                            if (char)
                            {
                                char.data["bIsCapturingFlag"] = true;
                            }
                        }
                    }
                    else
                    {
                        data.captureTimer[team] = 0;
                        data.team = team;

                        this.onFlagCaptured(_body, charsTouching[team]);
                    }
                }
            }
            else if (keys.length > 1)
            {
                data["bIsContested"] = true;
            }
        }
        else
        {
            switch (this.game.gameModeId)
            {
                case GameMode.DOMINATION:
                case GameMode.CONQUEST:
                    this.setDataValue(_body, "captureTimerMax", this.game.settings.fps * 10);
                    break;
            }
            for (var i = 0; i < 2; i++)
            {
                if (data.captureTimer[i] < data["captureTimerMax"])
                {
                    var val = 2;
                    data.captureTimer[i] = Math.min(data.captureTimer[i] + val, data["captureTimerMax"]);
                }
            }
        }
        if (data.team != undefined)
        {
            if (data["pointTimer"] > 0)
            {
                data["pointTimer"]--;
            }
            else
            {
                this.onFlagPoint(data.team);
                data["pointTimer"] = data["pointTimerMax"];
            }
        }
        var params = [];
        if (data.charsTouching)
        {
            if (prevTouching[0] != (data.charsTouching[0] != null ? data.charsTouching[0].length : 0) || prevTouching[1] != (data.charsTouching[1] != null ? data.charsTouching[1].length : 0))
            {
                params.push("charsTouching");
            }
        }
        if (bWasBeingCaptured != data.bIsBeingCaptured)
        {
            params.push("bIsBeingCaptured");
        }
        if (bWasContested != data.bIsContested)
        {
            params.push("bIsContested");
        }
        if (prevCapturingTeam != data.capturingTeam)
        {
            params.push("capturingTeam");
        }
        if (prevTeam != data.team)
        {
            params.push("team");
        }
        if (prevCaptureTimer[0] != data.captureTimer[0] || prevCaptureTimer[1] != data.captureTimer[1])
        {
            params.push("captureTimer");
        }
        if (params.length > 0)
        {
            this.pushObjectDataUpdate(data.id, params);
        }
    }

    onFlagPoint(_team, _carrierId)
    {
        if (_team != null)
        {
            var scores = this.game.gameModeData.scores;
            scores[_team]++;
            this.onEvent({
                eventId: GameServer.EVENT_GAME_UPDATE,
                data: {
                    scores: scores,
                    pointTeam: _team
                }
            });
            if (scores[_team] >= this.game.gameModeData.scoreLimit)
            {
                this.requestEvent({
                    eventId: GameServer.EVENT_GAME_END,
                    condition: MatchState.END_CONDITION_SCORE,
                    winningTeam: _team
                });
            }
        }
        if (_carrierId != null)
        {
            var ps = this.getPlayerStateById(_carrierId);
            if (ps)
            {
                if (ps.score >= 0)
                {
                    ps.score++;
                    this.onEvent({
                        eventId: GameServer.EVENT_PLAYER_UPDATE,
                        playerId: _carrierId,
                        data: {
                            score: ps.score
                        }
                    });
                }
            }
        }
    }

    onFlagCaptured(_flag, _playerIds)
    {
        if (_playerIds)
        {
            for (var i = 0; i < _playerIds.length; i++)
            {
                var ps = this.getPlayerById(_playerIds[i]);
                if (ps)
                {
                    ps.captures++;
                    this.onEvent({
                        eventId: GameServer.EVENT_PLAYER_UPDATE,
                        playerId: _playerIds[i],
                        data: {
                            captures: ps.captures
                        }
                    });
                }
            }
            this.game.gameModeData.flags[_flag.data.num] = _flag.data.team;
            var eventData = {
                eventId: GameServer.EVENT_GAME_UPDATE,
                data: {
                    flags: this.game.gameModeData.flags,
                    flagCaptured: _flag.data.num,
                    playerIds: _playerIds
                }
            };
            this.onEvent(eventData);
        }
        switch (this.game.gameModeId)
        {
            case GameMode.DOMINATION:
                //...
                break;
        }
    }

    handleEquipment(_body)
    {
        if (_body.position[1] > this.getCurrentMapData().height)
        {
            this.removeNextStep(_body);
        }
        var data = _body.data;        
        var weaponData = data.weaponData;
        if (weaponData.id != "jammer")
        {
            this.setDataValue(_body, "bJammed", this.hasNearbyJammer(_body));
        }
        switch (weaponData.id)
        {
            case "trophy":
                if (data.bJammed)
                {
                    break;
                }
                if (data.blockNum > 0)
                {
                    var targets = this.getRockets();
                    targets = targets.concat(this.getGrenades());
                    for (var i = 0; i < targets.length; i++)
                    {
                        var target = targets[i];
                        if (target.data.team != data.team)
                        {
                            var dist = this.Dist(_body.position[0], _body.position[1], target.position[0], target.position[1]);
                            if (dist <= weaponData.radius)
                            {
                                data.blockNum--;
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PAWN_ACTION,
                                    pawnId: data.id,
                                    type: GameServer.PAWN_TROPHY_HIT,
                                    pos: target.position
                                });
                                this.removeNextStep(target);
                                this.createExplosion({
                                    eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                                    x: target.position[0],
                                    y: target.position[1],
                                    radius: 200,
                                    damage: 0,
                                    playerId: null,
                                    causerId: null,
                                    weaponId: null
                                });
                                break;
                            }
                        }
                    }
                }
                else
                {
                    this.removeNextStep(_body);
                }
                break;

            default:
                if (weaponData.bMine)
                {
                    if (data.bTriggered)
                    {
                        if (data.triggerTimer > 0)
                        {
                            data.triggerTimer--;
                        }
                        else
                        {
                            this.detonate(_body);
                        }
                    }
                    else if (!data.bJammed)
                    {
                        var pawns = this.getPawns();
                        for (var i = 0; i < pawns.length; i++)
                        {
                            var pawn = pawns[i];
                            if (pawn.data.team != data.team)
                            {
                                if (this.isVehicle(pawn) && !this.vehicleHasOccupant(pawn))
                                {
                                    continue;
                                }
                                if (data.bUseScale)
                                {
                                    if (data.scale == 1 && pawn.position[0] < _body.position[0])
                                    {
                                        continue;
                                    }
                                    else if (data.scale == -1 && pawn.position[0] > _body.position[0])
                                    {
                                        continue;
                                    }
                                }
                                var bOverlap = (this.Dist(pawn.position[0], pawn.position[1], _body.position[0], _body.position[1]) < data.triggerRange) && this.checkLineOfSight(_body.position, pawn.position, false, pawn);
                                if (bOverlap)
                                {
                                    if (!data.triggerType || data.triggerType == pawn.data.type)
                                    {
                                        this.triggerMine(_body, Math.ceil(this.game.settings.fps * 0.5));
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
        }
    }

    triggerMine(_body, _timer)
    {
        var data = _body.data;
        if (data.bJammed)
        {
            return;
        }
        data.bTriggered = true;
        data.triggerTimer = _timer;
        this.requestEvent({
            eventId: GameServer.EVENT_PAWN_ACTION,
            pawnId: data.id,
            type: GameServer.PAWN_TRIGGER_MINE
        });
    }

    handleGrenade(_body)
    {
        var data = _body.data;
        if (data.stuckToId)
        {
            var stuckTo = this.getObjectById(data.stuckToId);
            if (!stuckTo)
            {
                if (_body.constraint)
                {
                    this.game.world.removeConstraint(_body.constraint);
                    delete _body.constraint;
                    _body.gravityScale = 1;
                }
            }
        }
        if (data["bDetonationTimerEnabled"])
        {
            if (data["detonationTimer"] > 0)
            {
                data["detonationTimer"]--;
            }
            else if (data["detonationTimer"] == 0)
            {
                if (!data.grenadeData.bImpact)
                {
                    this.detonate(_body);
                }
            }
        }
        if (data.minTimer > 0)
        {
            data.minTimer--;
            if (data.minTimer <= 0)
            {
                delete data.minTimer;
            }
        }
    }

    handleRocket(_body)
    {
        var data = _body.data;
        if (data.destroyTimer == 0)
        {
            this.detonate(_body);
        }
        if (_body.position[1] < -500)
        {
            this.removeNextStep(_body);
        }
        if (data.bAutoLock && !data.rocketData.enemyId)
        {
            var enemy = this.getNearestEnemyPawn(_body, {
                bIgnoreOutOfSight: false,
                maxRange: 1000,
                bLOS: true,
                bLockOn: true
            });
            if (enemy)
            {
                data.rocketData["enemyId"] = enemy.data.id;
            }
        }
        else if (data.rocketData["enemyId"] && !data.path)
        {
            var flare = this.getNearbyFlare(_body);
            if (flare)
            {
                data.rocketData.enemyId = flare.data.id;
            }
            var enemy = this.getObjectById(data.rocketData["enemyId"]);
            if (enemy)
            {
                if (enemy.data.bECM)
                {
                    data.rocketData.enemyId = null;
                }
                else if (enemy.data.health)
                {
                    var dist = this.DistBodies(enemy, _body);
                    if (dist < 50)
                    {
                        this.detonate(_body);
                    }
                    var distX = enemy.position[0] - _body.position[0];
                    var distY = enemy.position[1] - _body.position[1];
                    var rad = Math.atan2(distY, distX);
                    var speed = 300; //data.velocity ? data.velocity : 150;
                    var target = this.WrapAngle(_body.angle - rad, true);
                    if (_body.gravityScale > 0)
                    {
                        _body.gravityScale = 0;
                    }
                    _body.angle -= target * 0.5;
                    _body.applyForce([Math.cos(_body.angle) * speed, Math.sin(_body.angle) * speed], 0, 0);
                    this.constrainVelocity(_body, 1000);
                }
            }
        }
        else if (data["bControllable"])
        {
            var speed = 300;
            _body.applyForce([Math.cos(_body.angle) * speed, Math.sin(_body.angle) * speed], 0, 0);
            this.constrainVelocity(_body, 750);
        }
        else if (data.path)
        {
            var flare = this.getNearbyFlare(_body);
            if (flare)
            {
                data.rocketData.enemyId = flare.data.id;
                data.path = null;
            }
            var path = data.path;
            if (path && path.length > 0)
            {
                var curTarget = data.path[0];
                if (curTarget)
                {
                    if (this.Dist(curTarget[0], curTarget[1], _body.position[0], _body.position[1]) < 200)
                    {
                        path.splice(0, 1);
                    }
                    else
                    {
                        var distX = curTarget[0] - _body.position[0];
                        var distY = curTarget[1] - _body.position[1];
                        var rad = Math.atan2(distY, distX);
                        var speed = 500;
                        var target = this.WrapAngle(_body.angle - rad, true);
                        _body.angle -= target;
                        _body.applyForce([Math.cos(_body.angle) * speed, Math.sin(_body.angle) * speed], 0, 0);
                        this.constrainVelocity(_body, 1000);
                    }
                }
            }
            else
            {
                delete data.path;
            }
        }
    }

    handleVehicle(_body)
    {
        var data = _body.data;
        if (data.attachId)
        {
            if (!this.getObjectById(data.attachId))
            {
                this.setDataValue(_body, "attachId", null);
            }
        }
        if (data.attachToId)
        {
            console.log("attached to", data.attachToId);
            //_body.angularVelocity += -(_body.angle) * 0.5;
            if (!this.getObjectById(data.attachToId))
            {
                this.setDataValue(_body, "attachToId", null);
            }
        }
        if (data.scaleCooldown > 0)
        {
            data.scaleCooldown--;
        }
        if (data.bECM)
        {
            if (data.ecmTimer > 0)
            {
                data.ecmTimer--;
                if (data.ecmTimer <= 0)
                {
                    delete data.ecmTimer;
                    this.setDataValue(_body, "bECM", false);
                }
            }
        }
        if (data.bCountermeasureCooldown)
        {
            if (data.countermeasureCooldownTimer > 0)
            {
                data.countermeasureCooldownTimer--;
                if (data.countermeasureCooldownTimer <= 0)
                {
                    delete data.countermeasureCooldownTimer;
                    this.setDataValue(_body, "bCountermeasureCooldown", false);
                }
            }
        }
        var seats = data.seats;
        if (seats)
        {
            for (var i = 0; i < seats.length; i++)
            {
                var seat = seats[i];
                if (seat.pawnId)
                {
                    var pawn = this.getObjectById(seat.pawnId);
                    if (pawn)
                    {
                        pawn.position = [_body.position[0] + (seat.position[0] * data.scale), _body.position[1] + seat.position[1]];
                        pawn.angle = _body.angle;
                    }
                    else
                    {
                        delete seat.pawnId;
                    }
                }
            }
        }
        var weapons = data.weapons;
        if (weapons)
        {
            for (var i = 0; i < weapons.length; i++)
            {
                var weaponList = weapons[i];
                for (var j = 0; j < weaponList.length; j++)
                {
                    var weapon = weaponList[j];
                    if (weapon)
                    {
                        if (!seats[i].pawnId)
                        {
                            weapon.bWantsToFire = false;
                            this.setVehicleWeaponAimRotation(data.scale, weapon, (data.scale == 1 ? 0 : this.ToRad(180)) + _body.angle);
                        }

                        if (weapon.bFireDelay)
                        {
                            weapon.fireDelayTimer--;
                            if (weapon.fireDelayTimer == 0)
                            {
                                weapon.bFireDelay = false;
                            }
                        }
                        if (weapon.overheat > 0)
                        {
                            var cooldownNum = weapon.weaponData.cooldownNum ? weapon.weaponData.cooldownNum : 0.5;
                            weapon.overheat -= (weapon.bCooldown ? cooldownNum : weapon.weaponData.overheatCooldownNum != null ? weapon.weaponData.overheatCooldownNum : 1) / this.game.fpsMult;
                            if (weapon.overheat <= 0 && weapon.bCooldown)
                            {
                                if (weapon.ammo != null)
                                {
                                    weapon.ammo = weapon.weaponData.ammoMax;
                                }
                                weapon.bCooldown = false;
                                this.onEvent({
                                    eventId: GameServer.EVENT_PAWN_ACTION,
                                    pawnId: data.id,
                                    type: GameServer.PAWN_WEAPON_COOLDOWN,
                                    index: i,
                                    value: weapon.bCooldown,
                                    ammo: weapon.ammo
                                });
                            }
                        }
                        var bHasAmmo = weapon.ammo != null ? weapon.ammo > 0 : true;
                        var bCanFire = weapon.weaponData != null;
                        if (bCanFire && weapon.weaponData.bAirOnly)
                        {
                            var pawn = this.getObjectById(seats[i].pawnId);
                            bCanFire = bCanFire && pawn && pawn.data.lockOnTargetId;
                        }
                        if (weapon.bWantsToFire && !weapon.bFireDelay && !weapon.bCooldown && bHasAmmo && bCanFire)
                        {
                            var pawnId = seats[i].pawnId;
                            var muzzlePos = this.getVehicleMuzzlePosition(_body, i);
                            var weaponData = weapon.weaponData;
                            var bulletRad = weapon.aimRotation + this.ToRad(this.Random(-weaponData.accuracy, weaponData.accuracy) * 0.1);
                            if (weaponData.bAutoLock)
                            {
                                var pawn = this.getObjectById(pawnId);
                                if (pawn && pawn.data.lockOnTargetId)
                                {
                                    bulletRad += this.ToRad(this.Random(-15, 15));
                                }
                            }
                            if (weaponData.bRocket)
                            {
                                var pawn = this.getObjectById(pawn);
                                this.createRocket({
                                    x: muzzlePos[0],
                                    y: muzzlePos[1],
                                    type: weaponData["rocketType"] ? weaponData["rocketType"] : Rocket.TYPE_DEFAULT,
                                    team: data.team,
                                    playerId: pawnId,
                                    causerId: data.id,
                                    angle: bulletRad,
                                    weaponId: weaponData.id,
                                    damage: weaponData.damage,
                                    radius: weaponData.radius,
                                    bAirOnly: weaponData.bAirOnly,
                                    gravityScale: weaponData.gravityScale,
                                    bAutoLock: weaponData.bAutoLock,
                                    bCanLock: weaponData.bCanLock
                                });
                            }
                            else if (weaponData.bGrenade)
                            {
                                //TODO
                            }
                            else if (weaponData.bProjectile)
                            {
                                if (data.attachId)
                                {
                                    this.detachRope(_body);
                                }
                                else
                                {
                                    this.createProjectile(muzzlePos, bulletRad, data.team, {
                                        playerId: pawnId,
                                        causerId: data.id,
                                        rotation: bulletRad,
                                        velocity: 200,
                                        weaponId: weaponData.id,
                                        frameId: weaponData.frameId,
                                        sourceId: data.id
                                    });
                                }
                            }
                            else
                            {
                                this.createBullet(muzzlePos[0], muzzlePos[1], bulletRad, weaponData.range, weaponData.damage, pawnId, data.id, weaponData.id, weaponData, true, false, false);
                            }
                            weapon.bFireDelay = true;
                            weapon.fireDelayTimer = Math.max(1, Math.ceil(weaponData.fireRate * this.game.fpsMult));
                            if (weapon.ammo != null)
                            {
                                weapon.ammo--;
                            }
                            if (weapon.weaponData && weapon.weaponData.overheatMax)
                            {
                                weapon.overheat += (weapon.weaponData.overheatNum ? weapon.weaponData.overheatNum : Math.round(weaponData.fireRate * 1.75));
                                if (weapon.overheat >= weapon.weaponData.overheatMax)
                                {
                                    weapon.overheat = weapon.weaponData.overheatMax;
                                    weapon.bCooldown = true;
                                    this.onEvent({
                                        eventId: GameServer.EVENT_PAWN_ACTION,
                                        pawnId: data.id,
                                        type: GameServer.PAWN_WEAPON_COOLDOWN,
                                        index: i,
                                        value: weapon.bCooldown
                                    });
                                }
                            }
                            var obj = {
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: data.id,
                                type: GameServer.PAWN_FIRE_WEAPON,
                                index: i,
                                angle: weapon.aimRotation,
                                ammo: weapon.ammo,
                                overheat: weapon.overheat
                            };
                            this.requestEvent(obj);
                        }
                    }
                }
            }
        }
        if (data.health)
        {
            var deg = Math.abs(this.ToDeg(_body.angle));
            if (deg > 90)
            {
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_DAMAGE,
                    damageType: DamageType.DAMAGE_WORLD,
                    damageAmount: data.maxHealth,
                    pawnId: data.id,
                    attackerId: data.id,
                    causerId: data.id,
                    weaponId: "generic"
                });
            }
        }
        _body.position[1] = Math.max(0, _body.position[1]);
    }

    handleTank(_body)
    {
        this.handleVehicle(_body);
        this.constrainVelocity(_body, 275);
        var data = _body.data;
        if (!data.bOnGround)
        {
            _body.angularVelocity += -(_body.angle) * 0.01;
        }
    }

    handleCar(_body)
    {
        this.handleVehicle(_body);
        this.constrainVelocity(_body, 750);
        var data = _body.data;
        data.scale = _body.velocity[0] > 0 ? 1 : -1;
        data.bOnGround = this.isOnGround(_body);
        if (!data.bOnGround && this.vehicleHasOccupant(_body))
        {
            _body.angularVelocity += -(_body.angle) * 0.025;
        }
    }

    handleMountedWeapon(_body)
    {
        this.handleVehicle(_body);
    }

    handleHelicopter(_body)
    {        
        this.handleVehicle(_body);
        this.constrainVelocity(_body, 1000);
        var data = _body.data;
        if (data.swayMax > 0)
        {
            if (data.swayDir == 1)
            {
                data.sway++;
                if (data.sway > data.swayMax)
                {
                    data.swayDir = -1;
                }
            }
            else
            {
                data.sway--;
                if (data.sway < -data.swayMax)
                {
                    data.swayDir = 1;
                }
            }
        }
        if (this.vehicleHasOccupant(_body))
        {
            var sway = data.sway * 8;
            _body.applyForce([sway, sway]);
            var rad = this.ToRad(_body.velocity[0] * data.angleMult);
            //_body.angle -= (_body.angle - rad) * 0.2; 
            _body.angularVelocity += -(_body.angle - rad) * 0.35;
        }
    }

    handleReviver(_body)
    {
        var data = _body.data;
        if (!data.currentPawnId && data.bleedTimer != null)
        {
            if (data.bleedTimer > 0)
            {
                data.bleedTimer--;
                this.setDataValue(_body, "bleedTimer", data.bleedTimer - 1);
                if (data.bleedTimer <= 0)
                {
                    data.bleedTimer = null;
                    if (this.game.bOperation)
                    {
                        this.requestEvent({
                            eventId: GameServer.EVENT_GAME_END,
                            condition: MatchState.END_CONDITION_DEAD_ALLY
                        });
                    }
                    else
                    {
                        this.removeNextStep(_body);
                    }
                }
            }
        }
    }

    handleDoor(_body)
    {
        var data = _body.data;
        if (data.cooldownTimer > 0)
        {
            data.cooldownTimer--;
        }
    }

    handleCharacter(_body)
    {
        if (_body.position[1] > this.getCurrentMapData().height || _body.position[0] < 0 || _body.position[0] > this.getCurrentMapData().width)
        {
            this.killPawn(_body.data.id);
            return;
        }
        var data = _body.data;   
        if (data.bBot)
        {
            data.bOnGround = this.isOnGround(_body); 
            data.normal = this.getSurfaceNormal(_body);            
        }
        if (data.bParachute || data.controllableId)
        {
            data.bSprinting = false;
            data.bCrouching = false;
        }        

        var target = this.WrapAngle(data.aimRotation - data.desiredAimRotation, true);
        data.aimRotation -= target * data.aimSpeed;
        var deg = this.ToDeg(this.WrapAngle(data.aimRotation, true));
        var abs = Math.abs(deg);
        data.scale = abs < 90 ? 1 : -1;

        if (data.controllableId)
        {
            this.removeParachute(_body);
        }
        else
        {
            if (data.bWantsToMove && this.characterCanMove(_body) && this.matchInProgress())
            {
                var maxSpeed = data.maxSpeed * this.getCharacterSpeedMultiplier(_body);
                if (data.bStunned)
                {
                    maxSpeed = maxSpeed * 0.2;
                }
                else if (!data.bClimbing)
                {
                    if (data.bSprinting)
                    {
                        var mult = this.getSharedData("character").sprintMult;
                        maxSpeed = maxSpeed * mult;
                    }
                    else if (data.bCrouching)
                    {
                        var mult = this.getSharedData("character").crouchMult;
                        maxSpeed = maxSpeed * mult;
                    }
                }
                switch (data.moveX)
                {
                    case -1:
                        _body.velocity[0] = -maxSpeed;
                        if (data.type == "character")
                        {
                            var normal = this.getSurfaceNormal(_body);
                            if (normal && maxSpeed > 100)
                            {
                                var normX = Math.abs(normal[0]);
                                if (normX < 0.8)
                                {
                                    _body.velocity[1] += (maxSpeed * normX) * this.game.timestepMult;
                                }
                            }
                        }
                        break

                    case 1:
                        _body.velocity[0] = maxSpeed;
                        if (data.type == "character")
                        {
                            var normal = this.getSurfaceNormal(_body);
                            if (normal && maxSpeed > 0)
                            {
                                var normX = Math.abs(normal[0]);
                                if (normX < 0.8)
                                {
                                    _body.velocity[1] += (maxSpeed * normX) * this.game.timestepMult;
                                }
                            }
                        }
                        break;
                }
            }
            else
            {
                _body.velocity[0] = 0;
            }
            if (data["bClimbing"])
            {
                var shape = _body.shapes[0];
                if (shape)
                {
                    shape.collisionMask = CollisionGroups.PROJECTILE;
                }
                data.bCrouching = false;
                var ladder = this.getObjectById(data["ladderId"]);
                if (ladder)
                {
                    if (!data["bLadderCooldown"])
                    {
                        var ladderHeightHalf = (ladder.shapes[0].height * 0.5);
                        if (_body.position[1] < (ladder.position[1] - ladderHeightHalf))
                        {
                            if (_body.velocity[1] < 0)
                            {
                                this.leaveLadder(_body);
                            }
                        }
                        else if (_body.position[1] > (ladder.position[1] + ladderHeightHalf))
                        {
                            if (_body.velocity[1] > 0 && data["moveY"] == 1)
                            {
                                this.leaveLadder(_body);
                            }
                        }
                    }
                }
                if (data["bWantsToClimb"])
                {
                    var climbSpeed = (data["maxSpeed"] * this.getCharacterSpeedMultiplier(_body));
                    if (data["bStunned"])
                    {
                        climbSpeed = climbSpeed * 0.2;
                    }
                    switch (data["moveY"])
                    {
                        case -1:
                            _body.velocity[1] = -climbSpeed;
                            break
                        case 1:
                            _body.velocity[1] = climbSpeed;
                            break;
                    }
                }
                else
                {
                    _body.velocity[1] = 0;
                }
            }
        }

        if (data.type == "character")
        {
            var desiredHeight = this.getSharedData("character").height;
            if (data.bCrouching && !data.bClimbing)
            {
                data.bSprinting = false;
                desiredHeight = this.getSharedData("character").crouchHeight;
            }
            var shape = _body.shapes[0];
            if (shape.height != desiredHeight)
            {
                _body.removeShape(shape);
                var shape = new p2.Box({
                    width: 40,
                    height: desiredHeight,
                    collisionGroup: CollisionGroups.PAWN,
                    collisionMask: data.bClimbing ? CollisionGroups.PROJECTILE : (CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT)
                });
                _body.addShape(shape);
                if (data.bOnGround && !data.bClimbing)
                {
                    if (data.bCrouching)
                    {
                        _body.position[1] -= 1;
                    }
                    else 
                    {
                        _body.position[1] -= 15;
                    }
                }
                _body.wakeUp();
            }
        }         
        var weapon = data.weapon;
        if (weapon)
        {
            var recoilMult = 0.99; //Lower value is faster recoil recovery
            var recoilDecay = recoilMult * this.game.fpsMult;
            weapon.recoil = this.RoundDecimal(weapon.recoil * recoilDecay);
        }        
        var actualItem = this.getCurrentCharacterInventoryItem(_body, false);
        var curInvItem = this.getCurrentCharacterInventoryItem(_body);
        if (weapon.bFireHandler)
        {
            if (!data["bWantsToFire"])
            {
                weapon["bFireHandler"] = false;
            }
            else
            {
                if (this.characterCanFire(_body, true))
                {
                    this.fireCharacterWeapon(_body);
                    switch (curInvItem["fireMode"])
                    {
                        case Weapon.MODE_SEMI:
                            weapon["bFireDelay"] = true;
                            weapon["fireDelayTimer"] = Math.floor(curInvItem["fireRate"] * this.game.fpsMult);
                            weapon["bFireHandler"] = false;
                            break;

                        case Weapon.MODE_BURST:
                            weapon["bFireDelay"] = true;
                            weapon["fireDelayTimer"] = Math.floor(curInvItem["burstFireRate"] * this.game.fpsMult);
                            curInvItem["bursts"] = (curInvItem["numBursts"] ? curInvItem["numBursts"] : 3) - 1;
                            weapon["burstTimer"] = Math.floor(curInvItem["fireRate"] * this.game.fpsMult);
                            weapon["bBurstFireHandler"] = true;
                            weapon["bFireHandler"] = false;
                            break;

                        case Weapon.MODE_AUTO:
                            weapon["bFireDelay"] = true;
                            weapon["fireDelayTimer"] = Math.max(1, Math.ceil(curInvItem["fireRate"] * this.game.fpsMult));
                            break;
                    }
                }
                else if (curInvItem["mag"] == 0)
                {
                    this.reloadCharacterWeapon(_body);
                }
                else if (curInvItem["bAirOnly"])
                {
                    this.reloadCharacterWeapon(_body);
                }
                else if (data.bReloading)
                {
                    if (curInvItem["bSingleRoundLoaded"] && curInvItem["mag"] > 0)
                    {
                        this.cancelCharacterReload(_body);
                    }
                }
            }
        }
        if (weapon["bBurstFireHandler"])
        {
            if (curInvItem["bursts"] > 0)
            {
                if (weapon["burstTimer"] > 0) 
                {
                    weapon["burstTimer"]--;
                }
                else 
                {
                    if (curInvItem["mag"] > 0) 
                    {
                        if (curInvItem["bursts"] > 0)
                        {
                            curInvItem["bursts"]--;
                        }
                        weapon["burstTimer"] = Math.round(curInvItem["fireRate"] * this.game.fpsMult);
                        this.fireCharacterWeapon(_body);
                    }
                    else 
                    {
                        weapon["bBurstFireHandler"] = false;
                    }
                }
            }
            else 
            {
                weapon["bBurstFireHandler"] = false;
            }
        }
        if (weapon["bFireDelay"])
        {
            weapon["fireDelayTimer"]--;
            if (weapon["fireDelayTimer"] <= 0) 
            {
                weapon["bFireDelay"] = false;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_END_FIRE_DELAY
                });
                if (curInvItem["bNeedsBoltPull"])
                {
                    this.pullCharacterBolt(_body);
                }
                else if (curInvItem["mag"] == 0)
                {
                    if (curInvItem["ammo"] > 0)
                    {
                        this.reloadCharacterWeapon(_body);
                    }
                    this.onEndWeaponFire(_body);
                }
            }
        }
        if (weapon["bBoltDelay"])
        {
            weapon["boltDelayTimer"]--;
            if (weapon["boltDelayTimer"] <= 0) 
            {
                weapon["bBoltDelay"] = false;
                curInvItem["bNeedsBoltPull"] = false;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_END_BOLT_DELAY
                });
                if (curInvItem["mag"] == 0 && curInvItem["ammo"] > 0)
                {
                    this.reloadCharacterWeapon(_body);
                }
            }
        }
        if (weapon.bThrowDelay)
        {
            weapon.throwDelayTimer--;
            if (weapon.throwDelayTimer <= 0) 
            {
                weapon.bThrowDelay = false;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_END_THROW_DELAY
                });
            }
        }
        if (weapon["bEquipmentDelay"])
        {
            if (weapon["equipmentDelayTimer"] > 0)
            {
                weapon["equipmentDelayTimer"]--;
                if (!data.bCrouching)
                {
                    this.setDataValue(_body, "bCrouching", true);
                }
            }
            else
            {
                weapon["bEquipmentDelay"] = false;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_END_EQUIPMENT_DELAY
                });
                this.setDataValue(_body, "bCrouching", false);
            }
        }
        if (weapon["bUseDelay"])
        {
            if (weapon["useDelayTimer"] > 0)
            {
                weapon["useDelayTimer"]--;
            }
            if (weapon["useDelayTimer"] == 0) 
            {
                weapon["useDelayTimer"] = -1;
                var useData = weapon["useData"];
                if (useData)
                {
                    switch (useData.type)
                    {
                        //
                    }
                }
            }
        }
        if (data.vehicleCooldown > 0)
        {
            data.vehicleCooldown--;
        }
        else
        {
            delete data.vehicleCooldown;
        }
        if (data.seatTimer > 0)
        {
            data.seatTimer--;
            if (data.seatTimer <= 0)
            {
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_SWITCH_SEATS,
                    value: false
                });
                delete data.seatTimer;
                var vehicle = this.getObjectById(data.controllableId);
                if (vehicle)
                {
                    var seatIndex = this.getAvailableSeatIndex(vehicle);
                    if (seatIndex != null)
                    {
                        this.exitVehicle(_body);
                        this.enterVehicle(_body, vehicle, seatIndex);
                    }
                }
            }
        }
        if (data.stoppingPowerTimer > 0)
        {
            data.stoppingPowerTimer--;
            if (data.stoppingPowerTimer <= 0)
            {
                delete data.stoppingPowerTimer;
                this.setDataValue(_body, "bStoppingPower", false)
            }
        }
        if (data.currentRequest)
        {            
            if (data.requestTimer > 0)
            {
                data.requestTimer--;
            }
            else
            {
                delete data.requestTimer;
                this.setDataValue(_body, "currentRequest", 0);
            }
        }
        if (data.bShieldCooldown)
        {
            if (data.shieldCooldownTimer > 0)
            {
                data.shieldCooldownTimer--;
            }
            else
            {
                delete data.bShieldCooldown;
                delete data.shieldCooldownTimer;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_END_SHIELD_COOLDOWN,
                    bDoor: data.bDoorCooldown
                });
            }
        }
        if (weapon["bMeleeDelay"])
        {
            weapon["meleeDelayTimer"]--;
            if (weapon["meleeDelayTimer"] <= 0) 
            {
                weapon["bMeleeDelay"] = false;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_END_MELEE_DELAY
                });
                if (curInvItem["mag"] == 0 && curInvItem["ammo"] > 0)
                {
                    this.reloadCharacterWeapon(_body);
                }
            }
        }
        if (data.bReloading)
        {
            data["reloadTimer"]--;
            if (data["reloadTimer"] == 0)
            {
                data.bReloading = false;
                if (curInvItem["bSingleRoundLoaded"])
                {
                    var roundsToLoad = 1;
                    if (curInvItem["bSpeedLoader"])
                    {
                        var speedLoader = 2;
                        if (weapon.bUnlimitedAmmo)
                        {
                            roundsToLoad = speedLoader;
                        }
                        else if (curInvItem["ammo"] > speedLoader && (curInvItem["mag"] + speedLoader) <= curInvItem["magSize"])
                        {
                            roundsToLoad = speedLoader;
                        }
                    }
                    if (!weapon.bUnlimitedAmmo)
                    {
                        curInvItem["ammo"] = Math.max(curInvItem["ammo"] - roundsToLoad, 0);
                    }
                    curInvItem["mag"] = Math.min(curInvItem["mag"] + roundsToLoad, curInvItem["magSize"]);
                }
                else
                {
                    if (curInvItem["ammo"] >= curInvItem["magSize"] || weapon.bUnlimitedAmmo) 
                    {
                        if (!weapon.bUnlimitedAmmo)
                        {
                            curInvItem["ammo"] -= curInvItem["magSize"] - curInvItem["mag"];
                        }
                        curInvItem["mag"] = curInvItem["magSize"];
                    }
                    else if ((curInvItem["ammo"] + curInvItem["mag"]) > curInvItem["magSize"]) 
                    {
                        if (!weapon.bUnlimitedAmmo)
                        {
                            curInvItem["ammo"] -= curInvItem["magSize"] - curInvItem["mag"];
                        }
                        curInvItem["mag"] += (curInvItem["magSize"] - curInvItem["mag"]);
                    }
                    else 
                    {
                        curInvItem["mag"] += curInvItem["ammo"];
                        if (!weapon.bUnlimitedAmmo)
                        {
                            curInvItem["ammo"] -= curInvItem["ammo"];
                        }
                    }
                }
                this.requestEvent({
                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                    pawnId: data.id,
                    index: data["currentInventoryIndex"],
                    type: GameServer.INV_ITEM,
                    bBarrel: actualItem.bBarrel
                });
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_RELOAD_COMPLETE
                });
                if (curInvItem["bSingleRoundLoaded"] && curInvItem["mag"] < curInvItem["magSize"])
                {
                    this.reloadCharacterWeapon(_body);
                }
            }
        }
        if (data.bInteracting)
        {
            var interactable = this.getObjectById(data["interactableId"]);
            if (interactable)
            {
                if (data["interactTimer"] > 0)
                {
                    data["interactTimer"]--;
                }
                else
                {
                    if (data["interactableId"])
                    {
                        this.executeInteractable(interactable, data["id"]);
                    }
                    this.stopCharacterInteract(_body);
                }
            }
            else
            {
                this.stopCharacterInteract(_body);
            }
        }
        if (data["bLadderCooldown"])
        {
            if (data["ladderCooldownTimer"] > 0)
            {
                data["ladderCooldownTimer"]--;
            }
            else
            {
                var shape = _body.shapes[0];
                if (shape)
                {
                    shape.collisionMask = CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT;
                }

                var item = this.getCurrentCharacterInventoryItem(_body, false);
                data["speedMultiplier"] = item["speedModifier"];
                delete data["bLadderCooldown"];
                delete data["ladderCooldownTimer"];
                this.pushObjectDataUpdate(data.id, ["bLadderCooldown"]);
            }
        }
    }

    getCharacterMuzzlePosition(_body)
    {
        if (_body)
        {
            var data = _body.data;
            var rad = data.aimRotation;
            var armsWidth = 5;
            var pos = _body.position;
            if (data.clientPos)
            {
                //pos = data.clientPos;
            }
            var muzzlePos = [
                pos[0] + (Math.cos(rad) * armsWidth),
                (pos[1] - (data.bCrouching ? 15 : 25) + (Math.sin(rad) * armsWidth))
            ];
            return muzzlePos;
        }
        return null;
    }

    hasUnderbarrelMod(_weaponData)
    {
        return this.hasMod(_weaponData, Mods.ACCESSORY_M203) || this.hasMod(_weaponData, Mods.ACCESSORY_M320) || this.hasMod(_weaponData, Mods.ACCESSORY_GP25) || this.hasMod(_weaponData, Mods.ACCESSORY_MASTERKEY);
    }

    hasMod(_weaponData, _modId)
    {
        if (_weaponData && _modId)
        {
            switch (_modId)
            {
                case Mods.BARREL_SILENCER:
                    if (_weaponData.bSilenced)
                    {
                        return true;
                    }
                    break;
            }
            var mods = _weaponData.mods;
            if (mods)
            {
                var keys = Object.keys(mods);
                for (var i = 0; i < keys.length; i++)
                {
                    let key = keys[i];
                    if (mods[key] == _modId)
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    fireCharacterWeapon(_body)
    {
        var data = _body.data;
        var weapon = data.inventory[data.currentInventoryIndex];
        if (weapon.bBarrel && weapon.barrel)
        {
            weapon = weapon.barrel;
        }
        var rad = data.aimRotation;
        var bSilenced = this.hasMod(weapon, Mods.BARREL_SILENCER);
        var muzzlePos = this.getCharacterMuzzlePosition(_body);
        var bMelee = this.isMeleeWeapon(weapon);
        var numBullets = 1;
        if (weapon.type == Weapon.TYPE_SHOTGUN && !weapon.bSlug)
        {
            numBullets = 6;
        }
        for (var i = 0; i < numBullets; i++)
        {
            var useAccuracy = weapon.accuracy;
            if (weapon.type != Weapon.TYPE_SHOTGUN)
            {
                useAccuracy *= (data.bCrouching ? 0.8 : 1) * (data.bAiming ? 0.8 : 1);
            }
            useAccuracy *= 10;
            var bulletRad = rad + this.ToRad(this.Random(-useAccuracy, useAccuracy) * 0.1);
            bulletRad += this.ToRad(data.weapon.recoil);
            if (weapon.bRocket)
            {
                var rocketData = {
                    x: muzzlePos[0],
                    y: muzzlePos[1],
                    type: weapon.rocketType ? weapon.rocketType : Rocket.TYPE_DEFAULT,
                    team: data.team,
                    playerId: data.id,
                    causerId: data.id,
                    angle: bulletRad,
                    weaponId: weapon.id,
                    damage: weapon.damage,
                    radius: weapon.radius,
                    bAirOnly: weapon.bAirOnly,
                    bCanLock: weapon.bCanLock
                };
                if (weapon.fireDamage)
                {
                    rocketData.weaponData = weapon;
                }
                if (weapon.id == "javelin")
                {
                    var lookPos = [
                        _body.data["lookPos"][0],
                        Math.max(_body.data["lookPos"][1], 500)
                    ];
                    rocketData["path"] = [
                        [_body.position[0] + (_body.data["scale"] * 100), 0],
                        [lookPos[0] + (-_body.data["scale"] * 100), 0],
                        [lookPos[0] + (-_body.data["scale"] * 100), 500],
                        [lookPos[0], lookPos[1]]
                    ];
                    if (data.lockOnTargetId)
                    {
                        rocketData["path"].pop();
                    }
                }
                this.createRocket(rocketData);
            }
            else if (weapon.bGrenade)
            {
                var grenadeDamage = weapon.damage;
                if (weapon.mods)
                {
                    switch (weapon.mods[Mods.TYPE_AMMO])
                    {
                        case Mods.GRENADE_SMOKE:
                        case Mods.GRENADE_FLASH:
                            grenadeDamage = 50;
                            break;
                    }
                }
                this.createGrenade(muzzlePos, {
                    team: data.team,
                    playerId: data.id,
                    causerId: data.id,
                    rotation: bulletRad,
                    velocity: weapon.velocity ? weapon.velocity : 1500,
                    damage: grenadeDamage,
                    weaponId: weapon.id,
                    type: weapon.mods ? weapon.mods[Mods.TYPE_AMMO] : null,
                    bImpact: true,
                    bMinimumDistance: true
                });
            }
            else if (weapon.bProjectile)
            {
                //
            }
            else if (weapon.id == "blowtorch")
            {
                var vehicle = this.getTouchingVehicle(_body, true);
                if (vehicle && vehicle.data.health < vehicle.data.maxHealth)
                {
                    vehicle.data.health = Math.min(vehicle.data.maxHealth, vehicle.data.health + 10);
                    this.pushObjectDataUpdate(vehicle.data.id, ["health"]);
                }
                else
                {
                    return;
                }
            }
            else
            {
                var useDamage = weapon.damage;
                var bIgnoreObstacles = bMelee;
                this.createBullet(muzzlePos[0], muzzlePos[1], bulletRad, weapon.range, useDamage, data.id, data.id, weapon.id, weapon, true, bMelee, bIgnoreObstacles);
            }
        }
        var useRecoil = weapon.recoil;
        if (data.bAiming && this.hasMod(weapon, Mods.ACCESSORY_GRIP_ANGLED))
        {
            useRecoil *= 0.25;
        }
        //Post-recoil
        if (!weapon.bBoltAction)
        {
            var rand = this.Random(1, 2);
            var scaleVal = data.scale == 1 ? -1 : 1;
            var recoilMult = (data.bCrouching ? 0.5 : 1) * (data.bAiming ? 0.5 : 1);            
            var recoilVal = useRecoil + (Math.abs(useRecoil) * 0.2);
            data.weapon.recoil += -(recoilVal * recoilMult) * (rand == 1 ? scaleVal : -scaleVal);            
        }
        if (weapon.type == Weapon.TYPE_MELEE)
        {
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_FIRE_MELEE,
                recoil: weapon.recoil
            });
        }
        else
        {
            this.requestEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                pawnId: data.id,
                index: data.currentInventoryIndex,
                type: GameServer.INV_FIRE
            });
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_FIRE_WEAPON,
                recoil: useRecoil
            });
        }
        if (!weapon.bSilenced && !this.hasMod(weapon, Mods.BARREL_SILENCER))
        {
            this.exposePawn(_body);
        }
    }

    exposePawn(_body)
    {
        var data = _body.data;
        if (data.type == "character")
        {
            this.setDataValue(_body, "bExposed", true);
            data.exposeTimer = this.game.settings.fps * 2;
        }
    }

    createBullet(_x, _y, _rotation, _range, _damage, _instigatorId, _causerId, _weaponId, _weaponData, _bDirectlyCausedByPlayer, _bMelee, _bIgnoreObstacles)
    {
        var dist = _range;
        var vx = Math.cos(_rotation) * dist;
        var vy = Math.sin(_rotation) * dist;
        var causer = this.getObjectById(_causerId);
        var data = {
            eventId: GameServer.EVENT_SPAWN_BULLET,
            startX: Math.round(_x),
            startY: Math.round(_y),
            endX: Math.round(_x + vx),
            endY: Math.round(_y + vy),
            rotation: _rotation,
            team: causer ? causer.data.team : -1,
            damageAmount: _damage,
            controllerId: _instigatorId,
            causerId: _causerId,
            weaponId: _weaponId,
            weaponData: _weaponData
        }
        if (_bMelee) data.bMelee = true;
        if (_bDirectlyCausedByPlayer) data.bDirectlyCausedByPlayer = true;
        if (_bIgnoreObstacles) data.bIgnoreObstacles = true;
        if (this.hasMod(_weaponData, Mods.BARREL_SILENCER)) data.bSilenced = true;
        this.requestEvent(data);
    }

    setCharacterCurrentInventoryItem(_body, _index)
    {
        this.cancelCharacterReload(_body);
        this.cancelCharacterBoltPull(_body);
        var data = _body.data;
        var prevIndex = data.currentInventoryIndex;
        if (prevIndex == _index)
        {
            if (prev && prev.barrel)
            {
                this.toggleUnderbarrelEquipped(_body);
                return;
            }
        }
        var prev = data.inventory[prevIndex];
        data.currentInventoryIndex = _index;
        data.lockOnTargetId = null;
        var item = this.getCurrentCharacterInventoryItem(_body);
        if (!item)
        {
            console.warn("Invalid inventory item at index", _index);
            return;
        }
        if (item.bBarrel && item.barrel)
        {
            item = item.barrel;
        }
        if (prev)
        {        
            if (prev.id == "riot_shield")
            {
                data.bShieldCooldown = true;
                data["shieldCooldownTimer"] = Math.ceil(this.game.settings.fps * 0.5);
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_START_SHIELD_COOLDOWN
                });
            }
        }      
        data["reloadTimerMax"] = Math.round(Math.ceil(item["reloadTime"] * this.game.settings.fps) / _body.data["reloadMultiplier"]);
        data["reloadTimer"] = _body.data["reloadTimerMax"];
        data["aimRotation"] = this.ToRad(-90);
        data["speedMultiplier"] = item["speedModifier"];
        if (item["bNeedsBoltPull"])
        {
            this.pullCharacterBolt(_body);
        }
        if (data["lockOnTargetId"] != null)
        {
            data["lockOnTargetId"] = null;
        }
        if (item["mag"] == 0)
        {
            this.reloadCharacterWeapon(_body);
        }
        if (item.id == "riot_shield")
        {
            var shield = this.createShield(_body.data.id);
            if (shield)
            {
                data.shieldId = shield.data.id;
            }
        }
        else
        {
            if (data.shieldId)
            {
                this.removeObjectById(_body.data.shieldId);
                delete _body.data.shieldId;
            }
        }
    }

    pullCharacterBolt(_body)
    {
        _body.data.weapon["bBoltDelay"] = true;
        var item = this.getCurrentCharacterInventoryItem(_body);
        _body.data.weapon["boltDelayTimer"] = item["boltDelayTimer"] * this.game.settings.fps;
        this.requestEvent({
            eventId: GameServer.EVENT_PAWN_ACTION,
            pawnId: _body.data.id,
            type: GameServer.PAWN_PULL_BOLT
        });
    }

    cancelCharacterReload(_body)
    {
        if (_body.data.bReloading)
        {
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: _body.data.id,
                type: GameServer.PAWN_CANCEL_RELOAD
            });
        }
        _body.data.bReloading = false;
    }

    cancelCharacterBoltPull(_body)
    {
        if (_body.data.weapon["bBoltDelay"])
        {
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: _body.data.id,
                type: GameServer.PAWN_CANCEL_BOLT_PULL
            });
        }
        _body.data.weapon["bBoltDelay"] = false;
    }

    getSurfaceNormal(_body)
    {
        if (_body)
        {
            var world = this.game.world;
            for (var i = 0; i < world.narrowphase.contactEquations.length; i++)
            {
                var c = world.narrowphase.contactEquations[i];
                if (c.bodyA === _body || c.bodyB === _body)
                {
                    return c.normalA;
                }
            }
        }
        return null;
    }

    isCharacter(_body)
    {
        if (_body)
        {
            return _body.data.type == "character";
        }
        return false;
    }

    isHelicopter(_body)
    {
        if (_body)
        {
            return _body.data.type == "helicopter";
        }
        return false;
    }

    isTank(_body)
    {
        if (_body)
        {
            return _body.data.type == "tank";
        }
        return false;
    }

    isCar(_body)
    {
        if (_body)
        {
            return _body.data.type == "car";
        }
        return false;
    }

    isVehicle(_body)
    {
        if (_body)
        {
            switch (_body.data.type)
            {
                case "mountedWeapon":
                case "helicopter":
                case "tank":
                case "car":
                    return true;
            }
        }
        return false;
    }

    characterCanMove(_body)
    {
        var data = _body.data;
        var ps = this.getPlayerById(data.id);
        if (ps)
        {
            if (ps.controllableId)
            {
                return false;
            }
        }
        return !data.bClimbing && !data.bEquipmentDelay && !data.bInteracting && !data.attachToId;
    }

    characterHasWeaponDelay(_body)
    {
        var weapon = _body.data.weapon;
        return weapon.bFireDelay || weapon.bMeleeDelay || weapon.bThrowDelay || weapon.bEquipmentDelay || weapon.bUseDelay;
    }

    onSpawnProtectionTimer(_playerId)
    {
        this.removeSpawnProtection(_playerId);
    }

    startSpawnProtectionTimer(_playerId)
    {
        var ps = this.getPlayerById(_playerId);
        if (ps)
        {
            var protectionTime = 0.5;
            ps.timer_spawnProtection = Math.ceil(this.game.settings.fps * protectionTime);
            ps.bSpawnProtection = true;
            var pawn = this.getObjectById(_playerId);
            if (pawn)
            {
                this.setDataValue(pawn, "bSpawnProtection", ps.bSpawnProtection);
            }
            this.onEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE,
                playerId: ps.id,
                data: {
                    bSpawnProtection: ps.bSpawnProtection
                }
            });
        }
    }

    removeSpawnProtection(_playerId)
    {
        var ps = this.getPlayerById(_playerId);
        if (ps)
        {
            if (ps.timer_spawnProtection != null)
            {
                delete ps.timer_spawnProtection;
                ps.bSpawnProtection = false;
                var pawn = this.getObjectById(_playerId);
                if (pawn)
                {
                    this.setDataValue(pawn, "bSpawnProtection", ps.bSpawnProtection);
                }
                this.onEvent({
                    eventId: GameServer.EVENT_PLAYER_UPDATE,
                    playerId: ps.id,
                    data: {
                        bSpawnProtection: ps.bSpawnProtection
                    }
                });
            }
        }
    }

    onRespawnTimer(_playerId)
    {
        if (!this.game)
        {
            return;
        }
        if (!this.game.bPaused)
        {
            var ps = this.getPlayerById(_playerId);
            if (ps.id == _playerId)
            {
                if (!ps.controllableId)
                {
                    ps.respawnTimer--;
                    if (ps.respawnTimer < 0)
                    {
                        ps.respawnTimer = -1;
                        ps.bCanRespawn = true;
                        ps.bWaitingToRespawn = false;
                        if (ps.bAutoRespawn)
                        {
                            this.respawnPlayer(ps.id);
                        }                        
                    }
                    else
                    {
                        ps.timer_respawn = this.game.settings.fps;
                    }
                    this.onEvent({
                        eventId: GameServer.EVENT_PLAYER_UPDATE,
                        playerId: ps.id,
                        data: {
                            bWaitingSpawn: ps.bWaitingToRespawn,
                            bCanRespawn: ps.bCanRespawn,
                            respawnTimer: ps.respawnTimer,
                            bHasPawn: ps.bHasPawn
                        }
                    });
                }
            }
        }
    }

    isInitialized()
    {
        return this.bInit;
    }

    setPaused(_bVal)
    {
        this.game.bPaused = _bVal;
        var timers = [this.game.timer_game, this.game.timer_preGame];
        for (var i = 0; i < timers.length; i++)
        {
            var timer = timers[i];
            if (timer)
            {
                if (_bVal)
                {
                    timer.pause();
                }
                else
                {
                    timer.resume();
                }
            }
        }
    }

    onPreGameTimer()
    {
        if (!this.game)
        {
            return;
        }
        if (!this.game.bPaused)
        {
            this.game.preGameTimer--;
            if (this.game.preGameTimer < 0)
            {
                clearInterval(this.game.timer_preGame);
                delete this.game.timer_preGame;
                delete this.game.preGameTimer;
                var players = this.game.players;
                for (var i = 0; i < players.length; i++)
                {
                    var ps = players[i];
                    ps.bAutoRespawn = true;
                    this.onEvent({
                        eventId: GameServer.EVENT_PLAYER_UPDATE,
                        playerId: ps.id,
                        data: {
                            bAutoRespawn: ps.bAutoRespawn
                        }
                    });
                }
                this.game.state = MatchState.STATE_IN_PROGRESS;
                this.requestEvent({
                    eventId: GameServer.EVENT_GAME_START,
                    timer: this.game.gameTimer
                });
            }
            else
            {
                this.onEvent({
                    eventId: GameServer.EVENT_GAME_PRE_TIMER,
                    timer: this.game.preGameTimer
                });
            }
        }
    }

    onGameTimer()
    {
        if (!this.game)
        {
            return;
        }
        if (!this.game.bPaused && !this.game.preGameTimer)
        {
            switch (this.game.gameModeId)
            {
                default:
                    this.game.gameTimer--;
                    break;
            }

            this.onEvent({
                eventId: GameServer.EVENT_GAME_TIMER,
                timer: this.game.gameTimer
            });

            if (this.game.gameTimer < 0)
            {
                clearInterval(this.game.timer_game);
                delete this.game.timer_game;
                if (this.game.gameModeData.round != null)
                {
                    //TODO
                }
                else
                {
                    var endObj = {
                        eventId: GameServer.EVENT_GAME_END,
                        condition: MatchState.END_CONDITION_TIME
                    };
                    switch (this.game.gameModeId)
                    {
                        case GameMode.DEATHMATCH:
                            var players = this.getPlayers();
                            players.sort(function (a, b)
                            {
                                if (a.kills < b.kills) return 1;
                                if (a.kills > b.kills) return -1;
                                return 0;
                            });
                            if (players.length > 0)
                            {
                                if (players.length > 1 && players[1].kills === players[0].kills)
                                {
                                    endObj.winningTeam = -1; //Draw
                                }
                                else
                                {
                                    endObj.winningTeam = players[0].team;
                                }
                            }
                            break;

                        default:
                            var scores = this.game.gameModeData.scores;
                            if (scores)
                            {
                                if (scores[0] > scores[1])
                                {
                                    endObj.winningTeam = 0;
                                }
                                else if (scores[1] > scores[0])
                                {
                                    endObj.winningTeam = 1;
                                }
                                else
                                {
                                    endObj.winningTeam = -1; //Draw
                                }
                            }
                            break;
                    }
                    this.requestEvent(endObj);
                }
            }
        }
    }

    sendBatchData()
    {
        if (this.batchData.length > 0)
        {
            this.onEventFunc({
                eventId: GameServer.EVENT_BATCH,
                lobbyId: this.lobbyId,
                items: this.batchData
            });
            this.batchData = [];
        }
    }

    removePlayer(_id)
    {
        var players = this.game.players;
        for (var i = 0; i < players.length; i++)
        {
            var ps = players[i];
            if (ps.id == _id)
            {
                var timer = ps.timer_respawn;
                if (timer)
                {
                    delete ps.timer_respawn;
                }
                timer = ps.timer_spawnProtection;
                if (timer)
                {
                    delete ps.timer_spawnProtection;
                }
                players.splice(i, 1);
                return true;
            }
        }
        console.warn("Player does not exist:", _id);
        return false;
    }

    stopAllTimers()
    {
        var game = this.game;
        if (game["timer_game"])
        {
            var timer = game["timer_game"];
            clearInterval(timer);
            delete game["timer_game"];
        }
        if (game["timer_preGame"])
        {
            timer = game["timer_preGame"];
            clearInterval(timer);
            delete game["timer_preGame"];
        }
        if (game["timer_wave"])
        {
            timer = game["timer_wave"];
            clearInterval(timer);
            delete game["timer_wave"];
        }
        if (game["timer_waveSpawn"])
        {
            timer = game["timer_waveSpawn"];
            clearInterval(timer);
            delete game["timer_waveSpawn"];
        }
        var players = game.players;
        for (var i = 0; i < players.length; i++)
        {
            var player = players[i];
            timer = player["timer_respawn"];
            if (timer)
            {
                delete player["timer_respawn"];
            }
            timer = player["timer_spawnProtection"];
            if (timer)
            {
                delete player["timer_spawnProtection"];
            }
        }
    }

    getSpawnPointForTeam(_team)
    {
        var spawns = this.game.gameModeData.spawns;
        var arr = [];
        for (var i = 0; i < spawns.length; i++)
        {
            if (spawns[i].team == _team)
            {
                arr.push(spawns[i].position);
            }
        }
        var beacons = this.getEquipment("beacon");
        for (var i = 0; i < beacons.length; i++)
        {
            var beacon = beacons[i];
            if (beacon.data.team == _team)
            {
                arr.push(beacon.position);
            }
        }
        if (arr.length == 0)
        {
            console.warn("No spawn points");
            arr.push(spawns[this.Random(0, spawns.length - 1)].position);
        }
        return arr[this.Random(0, arr.length - 1)];
    }

    addPlayer(_data)
    {
        var ps = this.clone(_data);
        if (this.getPlayerById(ps.id))
        {
            return;
        }
        if (!ps.id)
        {
            console.warn("Missing player id", _data);
        }
        if (ps.team == null || ps.team < 0)
        {
            ps.team = 0;
            console.warn("Invalid team", _data);
        }
        ps.bCanRespawn = true;
        ps.desiredSpawn = this.getSpawnPointForTeam(ps.team);
        ps.bAutoRespawn = ps.bBot || !this.game.gameModeData.bAllowRespawns;
        ps.respawnTimer = this.matchInProgress() ? this.game.gameModeData.respawnTime : -1;
        ps.kills = 0;
        ps.headshots = 0;
        ps.assists = 0;
        ps.deaths = 0;
        ps.melees = 0;  
        ps.killedBy = [];
        switch (this.game.gameModeId)
        {
            case GameMode.DOMINATION:
            case GameMode.CONQUEST:
                ps.captures = 0;
                break;
        }        
        if (ps.currentClass == null)
        {
            if (ps.bBot)
            {
                if (!ps.classes)
                {
                    ps.classes = this.getBotClasses();
                }
                var classes = [Classes.ASSAULT, Classes.ENGINEER, Classes.SUPPORT, Classes.RECON];
                ps.currentClass = classes[this.Random(0, classes.length - 1)];
            }
            else
            {
                ps.currentClass = Classes.ASSAULT;
            }
        }
        this.setCurrentClass(ps, ps.currentClass);
        this.game.players.push(ps);
        this.requestEvent({
            eventId: GameServer.EVENT_PLAYER_JOIN,
            player: ps
        });
        if (ps.bAutoRespawn)
        {
            this.respawnPlayer(ps.id);
        }
        else
        {
            ps.respawnTimer = this.game.gameModeData.respawnTime;
            ps.timer_respawn = this.game.settings.fps;
        }
    }

    removePlayer(_id)
    {
        var players = this.game.players;
        for (var i = 0; i < players.length; i++)
        {
            var player = players[i];
            if (player.id == _id)
            {
                var timer = player["timer_respawn"];
                if (timer)
                {
                    delete player["timer_respawn"];
                }
                timer = player["timer_spawnProtection"];
                if (timer)
                {
                    delete player["timer_spawnProtection"];
                }
                players.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    setCurrentClass(_playerData, _classId)
    {
        var ps = _playerData;
        if (ps)
        {
            ps.currentClass = _classId;
            var factions = this.game.gameModeData.factions;
            ps.avatar = ps.classes[_classId].avatar[factions[ps.team]];
        }
    }

    onEvent(_data)
    {
        if (this.lobbyId)
        {
            _data.lobbyId = this.lobbyId;
        }
        //this.batchData.push(_data); 
        this.onEventFunc(_data);
    }

    requestEvent(_data)
    {
        if (_data)
        {
            var eventId = _data.eventId;
            switch (eventId)
            {
                case GameServer.EVENT_PLAYER_UPDATE:
                    if (_data.data)
                    {
                        var ps = this.getPlayerById(_data.playerId);
                        if (ps)
                        {
                            if (_data.data.team != null)
                            {
                                this.changeTeam(ps.id, _data.data.team);
                            }
                            if (_data.data.currentClass)
                            {
                                this.setCurrentClass(ps, _data.data.currentClass);
                            }
                            if (_data.data.vehicles)
                            {
                                if (!ps.vehicles)
                                {
                                    ps.vehicles = _data.data.vehicles;
                                }
                                else
                                {
                                    var keys = Object.keys(_data.data.vehicles);
                                    for (var i = 0; i < keys.length; i++)
                                    {
                                        var key = keys[i];
                                        ps.vehicles[key] = _data.data.vehicles[key];
                                    }
                                }
                            }
                            if (_data.data.desiredSpawn != null)
                            {
                                ps.desiredSpawn = _data.data.desiredSpawn;
                            }
                            if (_data.data.bAutoRespawn != null)
                            {
                                ps.bAutoRespawn = _data.data.bAutoRespawn;
                                if (ps.bAutoRespawn && ps.bCanRespawn)
                                {
                                    this.respawnPlayer(ps.id);
                                }
                            }
                        }
                    }
                    break;

                case GameServer.EVENT_PLAYER_JOIN:
                    
                    break;

                case GameServer.EVENT_PLAYER_LEAVE:
                    var pawn = this.getObjectById(_data.playerId);
                    if (pawn)
                    {
                        this.exitVehicle(pawn);
                        this.removeNextStep(pawn);
                    }
                    this.removeEquipmentByPlayerId(_data.playerId);
                    this.removeNextStep(this.getReviverByPlayerId(_data.playerId));
                    this.removePlayer(_data.playerId);
                    break;

                case GameServer.EVENT_SPAWN_EXPLOSION:
                    if (_data.damage)
                    {
                        this.checkExplosion(Math.round(_data["x"]), Math.round(_data["y"]), _data["radius"], _data["damage"], _data.playerId, _data["causerId"], _data["weaponId"], _data["bLOS"], _data["directHitId"]);
                    }
                    break;

                case GameServer.EVENT_PLAYER_INTERACT:
                    this.attemptInteract(_data.playerId);
                    break;

                case GameServer.PAWN_LOCK_ACQUIRED:
                    if (_data.bRocket)
                    {
                        var pawn = this.getObjectById(_data.pawnId);
                        if (pawn && pawn.data.bBot)
                        {
                            var veh = this.getObjectById(pawn.data.controllableId);
                            if (veh)
                            {
                                this.triggerCountermeasure(pawn);
                            }
                        }
                    }
                    break;

                case GameServer.EVENT_PAWN_ACTION:
                    switch (_data.type)
                    {
                        case GameServer.PAWN_START_LADDER_CLIMB:
                            var pawn = this.getObjectById(_data.pawnId);
                            if (pawn && !pawn.data.bBot)
                            {
                                var ladder = this.getObjectById(_data.ladderId);
                                if (ladder)
                                {
                                    this.startLadderClimb(pawn, ladder);
                                }
                            }
                            break;

                        case GameServer.PAWN_REQUEST:
                            var pawn = this.getObjectById(_data.pawnId);
                            if (pawn)
                            {
                                this.setPawnRequest(pawn, _data.value);
                            }
                            break;
                    }
                    if (_data.lockOnTargetId !== undefined)
                    {
                        var pawn = this.getObjectById(_data.pawnId);
                        if (pawn)
                        {
                            if (!pawn.data.lockOnTargetId && _data.lockOnTargetId)
                            {
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PAWN_ACTION,
                                    pawnId: _data.lockOnTargetId,
                                    type: GameServer.PAWN_LOCK_ACQUIRED
                                });
                            }
                            pawn.data.lockOnTargetId = _data.lockOnTargetId;                            
                        }
                        _data.bServer = true;
                    }
                    break;

                case GameServer.EVENT_PAWN_DAMAGE:
                    if (!this.matchInProgress())
                    {
                        break;
                    }
                    var damageAmount = _data.damageAmount;
                    if (isNaN(damageAmount) || damageAmount == 0)
                    {
                        damageAmount = 0;
                        break;
                    }
                    var pawnToDamage = this.getObjectById(_data.pawnId);
                    if (!pawnToDamage || !pawnToDamage.data)
                    {
                        break;
                    }
                    var causer = this.getObjectById(_data.causerId);
                    var killer = this.getPlayerById(_data.attackerId);
                    var killerPawn = this.getObjectById(_data.attackerId);
                    var bHitmarker = true;   
                    if (causer)
                    {
                        switch (pawnToDamage.data.type)
                        {
                            case "window":
                                bHitmarker = false;
                                break;
                            case "obstacle":
                                if (killerPawn)
                                {
                                    var angle = this.Angle(causer.position[0], causer.position[1], pawnToDamage.position[0], pawnToDamage.position[1]);
                                    var force = damageAmount * 2;
                                    pawnToDamage.applyImpulse([Math.cos(angle) * force, Math.sin(angle) * force]);
                                }
                                break;
                        }
                    }                                         
                    if (pawnToDamage.data.bGodMode || pawnToDamage.data.bSpawnProtection)
                    {
                        break;
                    }
                    if (pawnToDamage.data.type == "character" && killer && killer.id != pawnToDamage.data.id && killer.team == pawnToDamage.data.team)
                    {
                        damageAmount *= 0.25; //Friendly fire
                    }
                    _data.bHitmarker = bHitmarker == true ? 1 : 0;                    
                    if (pawnToDamage.data.health > 0)
                    {                        
                        var damageMultipliers = pawnToDamage.data.damageMultipliers;
                        if (damageMultipliers)
                        {
                            if (damageMultipliers[_data.damageType] != null)
                            {
                                damageAmount *= damageMultipliers[_data.damageType];
                            }
                        }
                        damageAmount = Math.ceil(damageAmount);
                        pawnToDamage.data.health = Math.max(0, Math.round(pawnToDamage.data.health - damageAmount));
                        this.pushObjectDataUpdate(pawnToDamage.data.id, ["health"]);
                        if (pawnToDamage.data.bRegenHealth)
                        {
                            pawnToDamage.data.regenTimer = pawnToDamage.data.regenTimerMax;
                        }
                        switch (pawnToDamage.data.type)
                        {
                            case "obstacle":
                                if (pawnToDamage.data.obstacleId == "barrel_explosive")
                                {
                                    pawnToDamage.data.playerId = _data.attackerId;
                                    pawnToDamage.data.detonationTimer = this.game.settings.fps * 3;
                                    this.setDataValue(pawnToDamage, "bTriggered", true);
                                }
                                break;
                        }                        
                        if (pawnToDamage.data.health <= 0)
                        {
                            _data.bKill = true;
                            switch (pawnToDamage.data.type)
                            {
                                default:
                                    var bTeamKill = bTeamKill || !bSuicide && killer ? (killer.team == pawnToDamage.data.team) : false;
                                    if (pawnToDamage.data["type"] == "character")
                                    {
                                        if (this.game.bRanked)
                                        {
                                            var victim = this.getPlayerById(_data["pawnId"]);
                                            if (!killer)
                                            {
                                                killer = victim;
                                            }
                                            if (killer && victim)
                                            {
                                                var bSuicide = killer == victim;
                                                this.onEvent({
                                                    eventId: GameServer.EVENT_KILLFEED_ADD,
                                                    type: FeedItem.TYPE_KILL,
                                                    killerId: killer.id,
                                                    killerName: killer["name"],
                                                    killerClan: killer["clan"],
                                                    killerTeam: killer.team,
                                                    victimId: victim.id,
                                                    victimName: victim["name"],
                                                    victimClan: victim["clan"],
                                                    victimTeam: victim.team,
                                                    weaponId: _data["weaponId"],
                                                    bHeadshot: _data.bHeadshot,
                                                    bDirectImpact: _data.bDirectImpact,
                                                    bSuicide: bSuicide
                                                });
                                            }
                                        }
                                    }
                                    var damageInfo = {
                                        type: pawnToDamage.data.type,
                                        damageType: _data.damageType,
                                        weaponId: _data.weaponId
                                    };
                                    switch (pawnToDamage.data.type)
                                    {
                                        case "equipment":
                                            damageInfo.equipmentId = pawnToDamage.data.weaponData.id;
                                            break;
                                    }
                                    if (pawnToDamage.data.controllableId)
                                    {
                                        damageInfo.bInVehicle = true;
                                    }
                                    if (_data["bDirectlyCausedByPlayer"])
                                    {
                                        damageInfo["bDirectlyCausedByPlayer"] = true;
                                    }
                                    if (_data["bTeamKill"] || bTeamKill)
                                    {
                                        damageInfo["bTeamKill"] = true;
                                    }
                                    if (_data["bMelee"])
                                    {
                                        damageInfo["bMelee"] = true;
                                    }
                                    if (bSuicide)
                                    {
                                        damageInfo["bSuicide"] = true;
                                    }
                                    if (_data.bHeadshot)
                                    {
                                        damageInfo.bHeadshot = true;
                                    }
                                    if (_data["bLongshot"])
                                    {
                                        damageInfo["bLongshot"] = true;
                                    }
                                    if (_data.bDirectImpact)
                                    {
                                        damageInfo.bDirectImpact = true;
                                    }
                                    _data["damageAmount"] = damageAmount;
                                    this.onPlayerKill(_data["attackerId"], damageAmount, _data["pawnId"], _data["causerId"], damageInfo);
                                    this.onPawnDeath(_data["pawnId"], damageAmount, _data["attackerId"], _data["causerId"], damageInfo);
                                    break;
                            }
                        }
                        else
                        {
                            switch (pawnToDamage.data.type)
                            {
                                case "character":
                                    if (this.isTeamGameMode())
                                    {
                                        if (!pawnToDamage.data.damagedBy)
                                        {
                                            pawnToDamage.data.damagedBy = [];
                                        }
                                        var damagedBy = pawnToDamage.data.damagedBy;
                                        if (damagedBy.indexOf(_data.attackerId) == -1)
                                        {
                                            damagedBy.push(_data.attackerId);
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    break;

                case GameServer.EVENT_SPAWN_BULLET:
                    var result = this.raycast(_data.startX, _data.startY, _data.endX, _data.endY);
                    if (result)
                    {
                        var dist = this.Dist(_data.startX, _data.startY, _data.endX, _data.endY);
                        var impactEffects = [];
                        var weaponData = _data.weaponData ? _data.weaponData : this.getWeaponData(_data.weaponId);
                        var penetration = 0;
                        var penetrationMax = weaponData ? weaponData.penetration : 1;
                        var impactType = Material.DEFAULT;
                        var bHit = false;
                        var hitIds = {};
                        var angle = this.Angle(_data.endX, _data.endY, _data.startX, _data.startY);
                        for (var i = 0; i < result.length; i++)
                        {
                            bHit = false;
                            var cur = result[i];
                            if (cur)
                            {
                                var body = cur.body;
                                var data = body.data;
                                if (data && !data.bInvisible)
                                {
                                    impactType = data.material ? data.material : Material.DEFAULT;
                                }                                
                                if (data.bInvisible)
                                {
                                    continue;
                                }
                                switch (data.type)
                                {
                                    case "equipment":
                                        if (data.weaponData.bMine)
                                        {
                                            this.detonate(body);
                                        }
                                        break;
                                    case "grenade":
                                        if (data.grenadeData.weaponId == "c4")
                                        {
                                            this.detonate(body);
                                        }
                                        break;
                                    case "character":
                                        var ps = this.getPlayerById(data.id);
                                        if (ps && ps.bSpawnProtection)
                                        {
                                            continue;
                                        }
                                        break;
                                    case "ground":
                                        penetration = penetrationMax;
                                        bHit = true;
                                        break;
                                    case "door":
                                        if (data.bClosed)
                                        {
                                            if (data.material == Material.METAL)
                                            {
                                                penetration = penetrationMax;
                                            }
                                            bHit = true;
                                        }
                                        break;
                                    case "obstacle":
                                        if (_data.bIgnoreObstacles && !body.data.health)
                                        {
                                            continue;
                                        }
                                        else
                                        {
                                            //Check if within obstacle
                                            var obsDist = 60;
                                            var causer = this.getObjectById(_data.causerId);
                                            if (causer)
                                            {
                                                if (causer.data.bBot)
                                                {
                                                    obsDist = 100;
                                                }
                                            }
                                            if (!body.data.bBlock && this.Dist(cur.point.x, cur.point.y, _data.startX, _data.startY) < obsDist)
                                            {
                                                continue;
                                            }
                                            penetration = penetrationMax;
                                            bHit = true;
                                        }
                                        break;
                                }
                                if (!hitIds[data.id])
                                {
                                    if (data.health)
                                    {
                                        var bCollide = data.team != _data.team;
                                        switch (data.type)
                                        {
                                            case "equipment":
                                                if (_data.controllerId == data.ownerId)
                                                {
                                                    bCollide = true;
                                                }
                                                break;
                                            case "helicopter":
                                            case "tank":
                                            case "car":
                                            case "mountedWeapon":
                                                bCollide = bCollide && this.vehicleHasOccupant(body);
                                                break;
                                        }
                                        if (bCollide)
                                        {
                                            hitIds[data.id] = true;
                                            var damageAmount = _data.damageAmount;
                                            if (penetration > 0)
                                            {
                                                var mult = (1 - (penetration / penetrationMax)) * (impactType == Material.METAL ? 0.25 : 0.75);
                                                if (penetration != penetrationMax)
                                                {
                                                    damageAmount = Math.ceil(damageAmount * mult);
                                                }
                                            }
                                            var bMelee = _data.bMelee;
                                            var bHeadshot = cur.bHeadshot;
                                            var bLegshot = cur.bLegshot;
                                            var bLongshot = cur.distance > dist * 0.5;                                            
                                            var bNearshot = !bMelee && cur.distance < 250;
                                            var damageType = DamageType.DAMAGE_BULLET;
                                            if (weaponData && this.isMeleeWeapon(weaponData))
                                            {
                                                bHeadshot = false;
                                                bLegshot = false;
                                            }
                                            if (bHeadshot)
                                            {
                                                damageAmount *= weaponData.headshotMult ? weaponData.headshotMult : 1.4;
                                            }
                                            else if (bLegshot)
                                            {
                                                damageAmount *= 0.75;
                                            }
                                            if (weaponData)
                                            {
                                                if (bNearshot)
                                                {
                                                    if (weaponData.type == Weapon.TYPE_SHOTGUN)
                                                    {
                                                        damageAmount *= 1.5;
                                                    }
                                                }
                                                else
                                                {
                                                    if (cur.distance > weaponData.dropRange)
                                                    {
                                                        damageAmount *= 0.5;
                                                    }
                                                }
                                                if (this.hasMod(weaponData, Mods.AMMO_STOPPING_POWER))
                                                {
                                                    this.onStoppingPowerHit(body);
                                                }
                                            }
                                            if (this.isVehicle(body))
                                            {
                                                if (weaponData)
                                                {
                                                    if (weaponData.round == "50bmg")
                                                    {
                                                        damageAmount *= 7.5;
                                                    }
                                                    damageAmount += Math.max(0, (weaponData.penetration - 1));
                                                }
                                            }
                                            if (this.hasMod(weaponData, Mods.ACCESSORY_MARKER))
                                            {
                                                this.exposePawn(body);
                                            }
                                            this.requestEvent({
                                                eventId: GameServer.EVENT_PAWN_DAMAGE,
                                                damageType: damageType,
                                                damageAmount: damageAmount,
                                                pawnId: body.data.id,
                                                attackerId: _data["controllerId"],
                                                causerId: _data["causerId"],
                                                weaponId: _data["weaponId"],
                                                bHeadshot: bHeadshot,
                                                bLongshot: bLongshot,
                                                bNearshot: bNearshot,
                                                bMelee: bMelee,
                                                bDirectlyCausedByPlayer: _data["bDirectlyCausedByPlayer"]
                                            });
                                            bHit = true;
                                        }
                                    }
                                    if (bHit)
                                    {
                                        impactEffects.push({
                                            x: Math.round(cur.point.x),
                                            y: Math.round(cur.point.y),
                                            rotation: angle,
                                            impactType: impactType,
                                            damageAmount: damageAmount ? damageAmount : _data.damageAmount
                                        });
                                        penetration++;
                                        if (penetration >= penetrationMax)
                                        {
                                            _data.endX = cur.point.x;
                                            _data.endY = cur.point.y;
                                            break;
                                        }
                                    }
                                }                                
                            }
                        }
                    }
                    if (impactEffects)
                    {
                        this.createImpactEffects(impactEffects);
                    }
                    break;

                case GameServer.EVENT_GAME_PAUSE:
                    this.game.bPaused = _data.bPaused;
                    break;

                case GameServer.EVENT_GAME_START:

                    break;

                case GameServer.EVENT_GAME_END:
                    if (_data.condition == MatchState.END_CONDITION_FORFEIT)
                    {
                        _data.winningTeam = -1; //Draw
                    }
                    this.game.gameModeData.winner = _data.winningTeam;
                    this.endGame();
                    break;

                case GameServer.EVENT_PLAYER_TRIGGER_EQUIPMENT:
                    var char = this.getObjectById(_data.playerId);
                    if (char)
                    {
                        if (char.data.controllableId && char.data.seatIndex == 0)
                        {
                            this.triggerCountermeasure(char);
                        }
                        else
                        {
                            this.triggerCharacterEquipment(_data, "equipment");
                        }
                    }
                    _data.bServer = true;
                    break;

                case GameServer.EVENT_PLAYER_TRIGGER_GRENADE:
                    this.triggerCharacterEquipment(_data, "grenade");
                    _data.bServer = true;
                    break;

                case GameServer.EVENT_PLAYER_TRIGGER_WEAPON:
                    this.triggerCharacterWeapon(_data);
                    break;

                case GameServer.EVENT_PLAYER_UPDATE_INVENTORY:
                    var pawn = this.getObjectById(_data["pawnId"]);
                    if (pawn)
                    {
                        var inventory = pawn.data["inventory"];
                        if (_data["bRemoveEquipment"])
                        {
                            pawn.data.equipment = null;
                            _data["equipment"] = null;
                        }
                        if (typeof _data.type !== "number")
                        {
                            console.warn("Invalid type:", _data.type);
                        }
                        switch (_data["type"])
                        {
                            case GameServer.INV_PERK_ADD:
                                var perks = pawn.data["perks"];
                                if (perks)
                                {
                                    if (perks.indexOf(_data["perkId"]) == -1)
                                    {
                                        perks.push(_data["perkId"]);
                                    }
                                }
                                this.updateCharacterPerks(pawn);
                                _data["perks"] = perks;
                                break;

                            case GameServer.INV_PERKS:
                                var perks = pawn.data["perks"];
                                this.updateCharacterPerks(pawn);
                                _data["perks"] = perks;
                                break;

                            case GameServer.INV_PERKS_SET:
                                pawn.data["perks"] = _data["perks"];
                                this.updateCharacterPerks(pawn);
                                break;

                            case GameServer.INV_FIRE:
                                var curItem = inventory[_data["index"]];
                                _data.bBarrel = curItem.bBarrel;
                                if (curItem.bBarrel)
                                {                                    
                                    var barrel = curItem.barrel;
                                    if (barrel)
                                    {
                                        barrel.mag--;
                                        //_data["item"] = barrel;
                                        _data.mag = barrel.mag;
                                    }
                                }
                                else
                                {
                                    if (!this.isMeleeWeapon(curItem))
                                    {
                                        curItem.mag--;
                                        if (curItem["bBoltAction"])
                                        {
                                            curItem["bNeedsBoltPull"] = true;
                                        }
                                        //_data["item"] = curItem;
                                        _data.mag = curItem.mag;
                                    }
                                }
                                break;

                            case GameServer.INV_CLASS_DATA:
                                if (!this.game.gameModeData["bNoClasses"] && this.game["bModeGame"])
                                {
                                    var ps = this.getPlayerById(_data["pawnId"]);
                                    if (ps && ps.bVIP)
                                    {
                                        _data = {};
                                    }
                                    else
                                    {
                                        var primary = this.getWeaponData(_data["primary"].id);
                                        this.applyWeaponMods(primary, _data["primary"]["mods"], pawn ? pawn.data.id : null);
                                        var secondary = this.getWeaponData(_data["secondary"].id);
                                        this.applyWeaponMods(secondary, _data["secondary"]["mods"], pawn ? pawn.data.id : null);
                                        var newEquipment = this.getWeaponData(_data["equipment"]);
                                        pawn.data["inventory"] = [primary, secondary];
                                        pawn.data["equipment"] = newEquipment;
                                        delete pawn.data["bBandolier"];
                                        this.setCharacterCurrentInventoryItem(pawn, 0);
                                        _data["inventory"] = pawn.data["inventory"];
                                        _data["equipment"] = pawn.data["equipment"];
                                        _data["currentInventoryIndex"] = 0;
                                        var perks = [
                                            _data["playerPerk"],
                                            _data["weaponPerk"]
                                        ];
                                        pawn.data.perks = perks;
                                        this.updateCharacterPerks(pawn);
                                        _data["perks"] = perks;
                                    }
                                }
                                else
                                {
                                    _data = {};
                                }
                                break;

                            case GameServer.INV_MOD_SET:
                                var weapon = pawn.data["inventory"][_data["index"]];
                                if (weapon)
                                {
                                    var mods = weapon["mods"] ? weapon["mods"] : {};
                                    mods[_data["modType"]] = _data["modId"];
                                    this.applyWeaponMods(weapon, mods);
                                    _data["inventory"] = pawn.data["inventory"];
                                }
                                break;

                            case GameServer.INV_UNDERBARREL_EQUIP:
                                var weapon = this.getCurrentCharacterInventoryItem(pawn, false);
                                if (weapon)
                                {
                                    weapon.bBarrel = _data.value;
                                    this.setCharacterCurrentInventoryItem(pawn, _data.index);
                                    _data.item = weapon;
                                    _data.mag = weapon.barrel.mag;
                                    _data.ammo = weapon.barrel.ammo;
                                }                                
                                break;

                            case GameServer.INV_EQUIPMENT_SET:
                                var equipmentData = this.getWeaponData(_data["value"]);
                                if (equipmentData)
                                {
                                    if (_data["ammo"] != undefined)
                                    {
                                        equipmentData["ammo"] = _data["ammo"];
                                    }
                                    pawn.data[_data.slot] = equipmentData;
                                    _data[_data.slot] = pawn.data[_data.slot];
                                }
                                break;

                            case GameServer.INV_EQUIPMENT_ADD:
                                var equipment = pawn.data[_data.slot];
                                if (equipment)
                                {
                                    equipment["ammo"] += _data["value"];
                                    equipment["ammo"] = Math.min(equipment["ammo"], equipment["ammoMax"]);
                                }
                                _data[_data.slot] = equipment;
                                break;

                            case GameServer.INV_AMMO:
                                inventory[_data["index"]]["ammo"] = _data["value"];
                                _data["item"] = inventory[_data["index"]];
                                break;

                            case GameServer.INV_AMMO_ADD:
                                inventory[_data["index"]]["ammo"] += _data["value"];
                                inventory[_data["index"]]["ammo"] = Math.min(inventory[_data["index"]]["ammo"], 999);
                                if (_data["barrelAmmo"] > 0 && inventory[_data["index"]]["barrelId"])
                                {
                                    inventory[_data["index"]]["barrelAmmo"] = Math.min(inventory[_data["index"]]["barrelAmmo"] + 1, inventory[_data["index"]]["barrelAmmoMax"]);
                                }
                                _data["item"] = inventory[_data["index"]];
                                break;

                            case GameServer.INV_MAG:
                                inventory[_data["index"]]["mag"] = _data["value"];
                                _data["item"] = inventory[_data["index"]];
                                break;

                            case GameServer.INV_MAG_ADD:
                                inventory[_data["index"]]["mag"] += _data["value"];
                                _data["item"] = inventory[_data["index"]];
                                break;

                            case GameServer.INV_BURSTS:
                                inventory[_data["index"]]["bursts"] = _data["value"];
                                _data["item"] = inventory[_data["index"]];
                                break;

                            case GameServer.INV_BURSTS_ADD:
                                inventory[_data["index"]]["bursts"] += _data["value"];
                                _data["item"] = inventory[_data["index"]];
                                break;

                            case GameServer.INV_ITEM:                                
                                if (_data.bBarrel)
                                {
                                    _data["item"] = inventory[_data["index"]].barrel;
                                }
                                else
                                {
                                    _data["item"] = inventory[_data["index"]];
                                }
                                break;

                            case GameServer.INV_ITEM_ADD:
                                if (inventory.length == 2)
                                {
                                    inventory.splice(0, 1);
                                }
                                inventory.push(_data["item"]);
                                this.setCharacterCurrentInventoryItem(pawn, 1);
                                _data["currentInventoryIndex"] = 1;
                                _data["inventory"] = inventory;
                                break;

                            case GameServer.INV_ITEM_REPLACE:
                                inventory[_data["index"]] = _data["item"];
                                if (_data["index"] == pawn.data["currentInventoryIndex"])
                                {
                                    this.setCharacterCurrentInventoryItem(pawn, _data["index"]);
                                }
                                _data["inventory"] = inventory;
                                break;

                            case GameServer.INV_INVENTORY_REPLACE:
                                pawn.data["inventory"] = _data["inventory"];
                                this.setCharacterCurrentInventoryItem(pawn, 0);
                                _data["currentInventoryIndex"] = 0;
                                _data["inventory"] = _data["inventory"];
                                break;

                            case GameServer.INV_CURRENT_INVENTORY_INDEX:
                                if (this.seatCanInput(pawn) && !pawn.data.weapon.bFireDelay && !pawn.data.bInteracting && !pawn.data.bClimbing && !pawn.data.bShieldCooldown && !pawn.data.weapon.bMeleeDelay)
                                {
                                    if (pawn.data.inventory[_data.value])
                                    {
                                        this.setCharacterCurrentInventoryItem(pawn, _data.value);
                                        _data.currentInventoryIndex = _data.value;
                                        var curItem = pawn.data.inventory[_data.value];
                                        if (pawn.data.bReloading)
                                        {
                                            _data.bReload = true;
                                        }
                                    }
                                }
                                break;

                            case GameServer.INV_INVENTORY:
                                _data.inventory = inventory;
                                break;

                            case GameServer.INV_EQUIPMENT:
                                _data[_data.slot] = pawn.data[_data.slot];
                                break;
                        }
                    }
                    break;

                case GameServer.EVENT_PLAYER_INPUT:                    
                    var keyInfo = _data.keyInfo;
                    if (keyInfo)
                    {
                        //var ps = this.getPlayerById(_data.playerId);
                        var pawn = this.getObjectById(_data.playerId);
                        var keys = Object.keys(keyInfo);
                        for (var i = 0; i < keys.length; i++)
                        {
                            var curKey = keys[i];
                            var sendData = {
                                keyId: curKey,
                                value: keyInfo[curKey]
                            };                            
                            if (pawn && pawn.data.controllableId)
                            {
                                var controllablePawn = this.getObjectById(pawn.data.controllableId);
                                this.handleControllableInput(pawn, controllablePawn, sendData);
                            }
                            else
                            {
                                this.handlePlayerInput(pawn, sendData);
                            }
                        }
                    }
                    _data.bServer = true;
                    break;
            }
            if (!_data.bServer)
            {
                this.onEvent(_data);
            }
        }
    }

    characterCanMelee(_body)
    {
        var data = _body.data;
        var ps = this.getPlayerById(data.id);
        if (ps && ps.controllableId)
        {
            return false;
        }
        if (data.bShieldCooldown)
        {
            return false;
        }
        var item = this.getCurrentCharacterInventoryItem(_body);
        var bWeaponCanMelee = this.isMeleeWeapon(item) ? item.bCanMelee : true;
        return !data.bInteracting && !data.bClimbing && !this.characterHasWeaponDelay(_body) && bWeaponCanMelee && !data.bParachute && !data.bSprinting;
    }

    triggerCharacterMeleeAttack(_body)
    {
        if (this.characterCanMelee(_body))
        {
            this.cancelCharacterReload(_body);
            this.cancelCharacterBoltPull(_body);
            var data = _body.data;
            var melee = data.melee;            
            data.weapon.bMeleeDelay = true;
            data.weapon.meleeDelayTimer = (melee ? melee.fireRate : 30) * this.game.fpsMult;            
            var damage = melee ? melee.damage : 100;
            this.createBullet(_body.position[0], _body.position[1] - 10, data.aimRotation, melee ? melee.range : 50, damage, data.id, data.id, melee ? melee.id : "none", null, true, true, true);
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_MELEE_ATTACK
            });
        }
    }

    getSeatData(_body)
    {
        var vehicle = this.getObjectById(_body.data.controllableId);
        if (vehicle)
        {
            return vehicle.data.seats[_body.data.seatIndex];
        }
        return null;
    }

    getVehiclePawnIds(_vehicle)
    {
        var arr = [];
        var seats = _vehicle.data.seats;
        if (seats)
        {
            for (var i = 0; i < seats.length; i++)
            {
                var seat = seats[i];
                if (seat.pawnId)
                {
                    arr.push(seat.pawnId);
                }
            }
        }
        return arr;
    }

    getVehicleDriverId(_vehicle)
    {
        var seats = _vehicle.data.seats;
        if (seats)
        {
            for (var i = 0; i < seats.length; i++)
            {
                var seat = seats[i];
                if (seat.pawnId)
                {
                    return seat.pawnId;
                }
            }
        }
        return null;
    }

    getVehicleMuzzlePosition(_body, _index)
    {
        var weapon = _body.data.weapons[_index];
        var pos = [_body.position[0], _body.position[1]];
        if (weapon.muzzlePos)
        {
            var offsetX = weapon.muzzlePos[0] * _body.data.scale;
            var offsetY = weapon.muzzlePos[1];
            pos[0] += offsetX;
            pos[1] += offsetY;
        }
        return pos;
    }

    setVehicleScale(_body, _val)
    {
        var data = _body.data;
        if (!data.scaleCooldown)
        {
            data.scaleCooldown = this.game.settings.fps;
            this.setDataValue(_body, "scale", _val);
        }
    }

    toggleVehicleWeapon(_body, _index)
    {
        var weapon = this.getVehicleWeapon(_body, _index);
        if (weapon)
        {
            
        }
    }

    toggleVehicleScale(_body)
    {
        this.setVehicleScale(_body, _body.data.scale == 1 ? -1 : 1);
    }

    canSwitchSeats(_body)
    {
        return !_body.data.seatTimer && !_body.data.vehicleCooldown && _body.data.controllableId;
    }

    getVehicleWeapon(_vehicle, _index)
    {
        var weapons = _vehicle.data.weapons;
        if (weapons)
        {
            var weaponIndex = _vehicle.data.weaponIndex != null ? _vehicle.data.weaponIndex : 0;
            if (weapons[_index])
            {
                return weapons[_index][weaponIndex];
            }
        }
        return null;
    }

    switchSeats(_body)
    {
        if (this.canSwitchSeats(_body))
        {
            var vehicle = this.getObjectById(_body.data.controllableId);
            if (vehicle)
            {
                var seatIndex = this.getAvailableSeatIndex(vehicle);
                if (seatIndex != null && (this.game.gameModeData.bSwitchSeats || seatIndex == 0))
                {
                    var weapon = this.getVehicleWeapon(vehicle, _body.data.seatIndex);
                    if (weapon)
                    {
                        weapon.bWantsToFire = false;
                    }
                    _body.data.seatTimer = this.game.settings.fps;
                    this.requestEvent({
                        eventId: GameServer.EVENT_PAWN_ACTION,
                        pawnId: _body.data.id,
                        type: GameServer.PAWN_SWITCH_SEATS,
                        value: true
                    });
                    //this.exitVehicle(_body);
                    //this.enterVehicle(_body, vehicle, seatIndex);
                }
            }
        }
    }

    handleControllableInput(_char, _controllable, _data)
    {
        if (!_char || !_controllable || !_data)
        {
            return;
        }
        var type = _controllable.data.type;
        var keyId = _data["keyId"];
        var value = _data["value"];
        var seatData = this.getSeatData(_char);
        if (seatData && seatData.bInput)
        {
            this.handlePlayerInput(_char, _data);
        }
        var map = this.getCurrentMapData();
        switch (keyId)
        {
            case Control.RELOAD:
                var weapon = this.getVehicleWeapon(_controllable, _char.data.seatIndex);
                if (weapon && weapon.weaponData)
                {
                    if (weapon.weaponData.overheatCooldownNum == 0 && !weapon.bCooldown)
                    {
                        weapon.bCooldown = true;
                        this.onEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: _controllable.data.id,
                            type: GameServer.PAWN_WEAPON_COOLDOWN,
                            index: _char.data.seatIndex,
                            value: weapon.bCooldown
                        });
                    }
                }
                break;
        }
        switch (type)
        {
            case "mountedWeapon":
                switch (keyId)
                {
                    case Control.LOOK:
                        var weapons = _controllable.data.weapons;
                        if (weapons)
                        {
                            var weapon = this.getVehicleWeapon(_controllable, _char.data.seatIndex);
                            if (weapon && value.pos)
                            {
                                var muzzlePos = this.getVehicleMuzzlePosition(_controllable, _char.data.seatIndex);
                                this.setVehicleWeaponAimRotation(_controllable.data.scale, weapon, this.Angle(muzzlePos[0], muzzlePos[1], value.pos[0], value.pos[1]));
                            }
                        }
                        break;
                }
                break;

            case "car":
                var carSpeed = 100;
                switch (keyId)
                {
                    case Control.SWITCH:
                        this.switchSeats(_char);
                        break;

                    case Control.LOOK:
                        var weapons = _controllable.data.weapons;
                        if (weapons)
                        {
                            var weapon = this.getVehicleWeapon(_controllable, _char.data.seatIndex);
                            if (weapon && value.pos)
                            {
                                var muzzlePos = this.getVehicleMuzzlePosition(_controllable, _char.data.seatIndex);
                                this.setVehicleWeaponAimRotation(_controllable.data.scale, weapon, this.Angle(muzzlePos[0], muzzlePos[1], value.pos[0], value.pos[1]));
                            }
                        }
                        break;

                    case Control.LEFT:
                        if (_char.data.seatIndex == 0 && !_controllable.data.attachToId)
                        {
                            if (value && _controllable.position[0] > 0)
                            {
                                _controllable.applyImpulse([-carSpeed, 0]);
                            }
                        }
                        break;

                    case Control.RIGHT:
                        if (_char.data.seatIndex == 0 && !_controllable.data.attachToId)
                        {
                            if (value && _controllable.position[0] < map.width)
                            {
                                _controllable.applyImpulse([carSpeed, 0]);
                            }
                        }
                        break;
                }
                break;

            case "tank":
                var tankSpeed = _controllable.data.speed;
                switch (keyId)
                {
                    case Control.WEAPON:
                        this.toggleVehicleWeapon(_controllable);
                        break;

                    case Control.JUMP:
                        if (_char.data.seatIndex == 0)
                        {
                            this.toggleVehicleScale(_controllable);
                        }
                        break;

                    case Control.SWITCH:
                        this.switchSeats(_char);
                        break;

                    case Control.LOOK:
                        if (_char.data.seatTimer)
                        {
                            return;
                        }
                        var weapons = _controllable.data.weapons;
                        if (weapons)
                        {
                            var weapon = this.getVehicleWeapon(_controllable, _char.data.seatIndex);
                            if (weapon && value.pos)
                            {
                                var muzzlePos = this.getVehicleMuzzlePosition(_controllable, _char.data.seatIndex);
                                this.setVehicleWeaponAimRotation(_controllable.data.scale, weapon, this.Angle(muzzlePos[0], muzzlePos[1], value.pos[0], value.pos[1]));
                            }
                        }
                        break;

                    case Control.LEFT:
                        if (_char.data.seatIndex == 0 && !_controllable.data.attachToId)
                        {
                            if (value && _controllable.position[0] > 0)
                            {
                                _controllable.applyImpulse([-tankSpeed, 0]);
                            }
                        }
                        break;

                    case Control.RIGHT:
                        if (_char.data.seatIndex == 0 && !_controllable.data.attachToId)
                        {
                            if (value && _controllable.position[0] < map.width)
                            {
                                _controllable.applyImpulse([tankSpeed, 0]);
                            }
                        }
                        break;
                }
                break;

            case "helicopter":
                var heliSpeed = (_controllable.data.speed ? _controllable.data.speed : 4500);
                switch (keyId)
                {
                    case Control.JUMP:
                        if (_char.data.seatIndex == 0)
                        {
                            this.toggleVehicleScale(_controllable);
                        }
                        break;

                    case Control.SWITCH:
                        this.switchSeats(_char);
                        break;

                    case Control.LOOK:
                        if (_char.data.seatTimer)
                        {
                            return;
                        }
                        var weapons = _controllable.data.weapons;
                        if (weapons)
                        {
                            var weapon = this.getVehicleWeapon(_controllable, _char.data.seatIndex);
                            if (weapon && value.pos)
                            {
                                var muzzlePos = this.getVehicleMuzzlePosition(_controllable, _char.data.seatIndex);
                                this.setVehicleWeaponAimRotation(_controllable.data.scale, weapon, this.Angle(muzzlePos[0], muzzlePos[1], value.pos[0], value.pos[1]));
                            }
                        }
                        break;

                    case Control.LEFT:
                        if (_char.data.seatIndex == 0)
                        {
                            if (value && _controllable.position[0] > 0)
                            {
                                _controllable.applyForce([-heliSpeed, 0]);
                            }
                        }
                        break;

                    case Control.RIGHT:
                        if (_char.data.seatIndex == 0)
                        {
                            if (value && _controllable.position[0] < map.width)
                            {
                                _controllable.applyForce([heliSpeed, 0]);
                            }
                        }
                        break;

                    case Control.UP:
                        if (_char.data.seatIndex == 0)
                        {
                            if (value && _controllable.position[1] > 0)
                            {
                                _controllable.applyForce([0, -heliSpeed]);
                            }
                        }
                        break;

                    case Control.DOWN:
                        if (_char.data.seatIndex == 0)
                        {
                            if (value && _controllable.position[1] < map.height)
                            {
                                _controllable.applyForce([0, heliSpeed]);
                            }
                        }
                        break;
                }
                break;
        }
    }

    toggleUnderbarrelEquipped(_body)
    {
        var item = this.getCurrentCharacterInventoryItem(_body, false);
        if (item)
        {
            if (this.hasUnderbarrelMod(item))
            {
                //if (item.bBarrel || (item.barrel.mag > 0 && item.barrel.ammo > 0))
                var data = _body.data;
                this.requestEvent({
                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                    pawnId: data.id,
                    type: GameServer.INV_UNDERBARREL_EQUIP,
                    index: data.currentInventoryIndex,
                    value: !item.bBarrel
                });
                //console.log(item.id, item.mods ? item.mods[Mods.TYPE_ACCESSORY] : null, item.bBarrel);
            }
        }
    }

    handlePlayerInput(_body, _data)
    {
        if (!_body || !_data)
        {
            return;
        }
        var keyId = _data.keyId;
        var value = _data.value;
        var pawn = _body;
        if (pawn)
        {
            var data = pawn.data;
            if (pawn.data.seatTimer)
            {
                return;
            }
            switch (keyId)
            {
                case Control.SWITCH:
                    var inventory = data.inventory;
                    if (inventory[data.currentInventoryIndex].barrel && inventory[data.currentInventoryIndex].bBarrel)
                    {
                        this.toggleUnderbarrelEquipped(_body);
                    }
                    else
                    {
                        if (inventory.length > 1)
                        {
                            this.requestEvent({
                                eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                pawnId: data.id,
                                type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                                value: data.currentInventoryIndex == 0 ? 1 : 0
                            });
                        }
                    }
                    break;

                case Control.WEAPON:
                    this.toggleUnderbarrelEquipped(pawn);
                    break;

                case Control.ITEM_1:
                    if (data.currentInventoryIndex != 0)
                    {
                        this.requestEvent({
                            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                            pawnId: data.id,
                            type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                            value: 0
                        });
                    }
                    break;

                case Control.ITEM_2:
                    if (data.currentInventoryIndex != 1)
                    {
                        this.requestEvent({
                            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                            pawnId: data.id,
                            type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                            value: 1
                        });
                    }
                    break;

                case Control.ITEM_3:
                    if (data.currentInventoryIndex != 2)
                    {
                        this.requestEvent({
                            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                            pawnId: data.id,
                            type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                            value: 2
                        });
                    }
                    break;

                case Control.LOOK:
                    data.desiredAimRotation = value.angle;
                    data.lookPos = value.pos;
                    data.bAiming = value.bAiming == true ? 1 : 0;
                    if (value.char && !data.bBot)
                    {
                        data.clientPos = value.char; 
                        _body.position[0] = (value.char[0] + _body.position[0]) * 0.5;
                        _body.position[1] = (value.char[1] + _body.position[1]) * 0.5;
                        _body.velocity[1] = -value.vel[1] / 0.05;
                        data.bOnGround = value.bOnGround;
                    }
                    break;

                case Control.MELEE:
                    this.triggerCharacterMeleeAttack(pawn);
                    break;

                case Control.RELOAD:
                    this.reloadCharacterWeapon(pawn, true);
                    break;

                case Control.LEFT:
                    data.bWantsToMove = value && this.characterCanMove(_body);
                    if (data.bWantsToMove)
                    {
                        data.moveX = -1;
                    }
                    else
                    {
                        pawn.velocity[0] = 0;
                    }
                    break;

                case Control.RIGHT:
                    data.bWantsToMove = value && this.characterCanMove(_body);
                    if (value)
                    {
                        data.moveX = 1;
                    }
                    else
                    {
                        pawn.velocity[0] = 0;
                    }
                    break;

                case Control.UP:
                    if (value && !pawn.data.bClimbing && this.characterCanClimb(pawn))
                    {
                        var ladder = this.getClimbableLadder(pawn);
                        if (ladder)
                        {
                            var ladderOffset = (ladder.data.height * 0.5) - 30;
                            if (pawn.position[1] > (ladder.position[1] - ladderOffset))
                            {
                                this.startLadderClimb(pawn, ladder);
                            }
                        }
                    }
                    if (data.bClimbing)
                    {
                        data.bWantsToClimb = value;
                        if (value)
                        {
                            data.moveY = -1;
                        }
                    }
                    break;

                case Control.DOWN:
                    if (value && !pawn.data.bClimbing && this.characterCanClimb(pawn))
                    {
                        var ladder = this.getClimbableLadder(pawn);
                        if (ladder)
                        {
                            var ladderOffset = (ladder.data.height * 0.5) - 30;
                            if (pawn.position[1] < (ladder.position[1] + ladderOffset))
                            {
                                this.startLadderClimb(pawn, ladder);
                            }
                        }
                    }
                    if (pawn.data.bClimbing)
                    {
                        pawn.data.bWantsToClimb = value;
                        if (value)
                        {
                            pawn.data.moveY = 1;
                        }
                    }
                    break;

                case Control.JUMP:
                    if (value)
                    {
                        if (this.characterCanJump(pawn))
                        {
                            if (data.bClimbing)
                            {
                                this.leaveLadder(pawn);
                            }
                            this.triggerCharacterJump(pawn);
                        }
                        else if (!this.isOnGround(pawn) && pawn.velocity[1] > this.getSharedData("character").parachuteVelocity)
                        {
                            this.deployParachute(pawn);
                        }
                    }
                    else
                    {
                        this.removeParachute(pawn);
                    }
                    break;

                case Control.CROUCH:
                    this.setDataValue(pawn, "bCrouching", value && this.characterCanCrouch(pawn));
                    if (data.bClimbing && !data.bBot)
                    {
                        this.leaveLadder(pawn);
                        pawn.wakeUp();
                    }
                    break;

                case Control.SPRINT:
                    this.setDataValue(pawn, "bSprinting", value && this.characterCanSprint(pawn));
                    break;

                case Control.FIRE:
                    this.triggerCharacterWeapon({
                        playerId: _body.data.id,
                        value: value
                    });
                    break;
            }
        }
    }

    triggerCharacterJump(_body)
    {
        if (!this.characterCanJump(_body))
        {
            return;
        }
        var data = _body.data;
        _body.velocity[1] = -data.jumpHeight;
        _body.wakeUp();
        this.requestEvent({
            eventId: GameServer.EVENT_PAWN_ACTION,
            pawnId: data.id,
            type: GameServer.PAWN_JUMP
        });
    }

    executeInteractable(_interactable, _playerId)
    {
        if (!this.matchInProgress())
        {
            return;
        }
        if (_interactable.data["bLimitInteractions"])
        {
            delete _interactable.data["currentPawnId"];
        }
        this.onEvent({
            eventId: GameServer.EVENT_INTERACTABLE_USED,
            data: {
                interactableId: _interactable.data.id,
                playerId: _playerId
            }
        });
        var pawn = this.getObjectById(_playerId);
        var data = _interactable.data;
        if (data)
        {
            switch (data.type)
            {
                case "reviver":
                    this.respawnPlayer(data.itemData.playerId, _interactable.position);
                    this.removeNextStep(_interactable);
                    console.log("REMOVE REVIVER", _interactable.data.id);
                    break;

                case "lever":
                    if (!pawn.data.shieldCooldownTimer)
                    {
                        var target = this.getObjectById(data.targetId);
                        if (target)
                        {
                            switch (target.data.type)
                            {
                                case "door":
                                    this.setDoorClosed(target, !target.data.bClosed);
                                    this.startCharacterShieldCooldown(pawn);
                                    var links = data.links;
                                    if (links)
                                    {
                                        for (var i = 0; i < links.length; i++)
                                        {
                                            this.setPathLinkDisabled(links[i], target.data.bClosed);
                                        }
                                        this.generateMapNodes();
                                    }
                                    break;
                            }
                        }
                    }
                    break;

                case "door":
                    if (!data.cooldownTimer && data.material != Material.METAL)
                    {
                        this.setDoorClosed(_interactable, !data.bClosed, pawn);
                        this.startCharacterShieldCooldown(pawn); 
                    }
                    break;

                case "equipment":
                    switch (data.weaponData.id)
                    {
                        case "ammo_box":
                            var inventory = pawn.data["inventory"];
                            var numMags = 1;
                            for (var i = 0; i < inventory.length; i++)
                            {
                                var invItem = inventory[i];
                                if (!invItem.bMelee && invItem.ammo != null)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data.id,
                                        index: i,
                                        type: GameServer.INV_AMMO_ADD,
                                        value: invItem.magSize * numMags,
                                        barrelAmmo: 1
                                    });
                                }
                            }
                            this.requestEvent({
                                eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                pawnId: pawn.data.id,
                                type: GameServer.INV_EQUIPMENT_ADD,
                                slot: "grenade",
                                value: 1
                            });
                            if (pawn.data.equipment.id != "ammo_box")
                            {
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data.id,
                                    type: GameServer.INV_EQUIPMENT_ADD,
                                    slot: "equipment",
                                    value: 1
                                });
                            }
                            break;
                    }
                    break;

                case "crate":
                    switch (data.crateType)
                    {
                        case Crate.AMMO:
                            var inventory = pawn.data["inventory"];
                            var numMags = 1;
                            for (var i = 0; i < inventory.length; i++)
                            {
                                var invItem = inventory[i];
                                if (!invItem.bMelee && invItem.ammo != null)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data.id,
                                        index: i,
                                        type: GameServer.INV_AMMO_ADD,
                                        value: invItem.magSize * numMags,
                                        barrelAmmo: 1
                                    });
                                }
                            }
                            this.requestEvent({
                                eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                pawnId: pawn.data.id,
                                type: GameServer.INV_EQUIPMENT_ADD,
                                slot: "grenade",
                                value: 1
                            });
                            if (pawn.data.equipment.id != "ammo_box")
                            {
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data.id,
                                    type: GameServer.INV_EQUIPMENT_ADD,
                                    slot: "equipment",
                                    value: 1
                                });
                            }
                            break;
                    }
                    break;

                case "mountedWeapon":
                case "helicopter":
                case "tank":
                case "car":
                    var seatIndex = this.getAvailableSeatIndex(_interactable);
                    if (seatIndex != null)
                    {
                        this.enterVehicle(pawn, _interactable, seatIndex);
                    }
                    break;

                case "droppedWeapon":
                    if (pawn)
                    {
                        var weaponData = data.itemData["weaponData"];
                        if (weaponData.type == Weapon.TYPE_MELEE && weaponData.id != "blowtorch")
                        {
                            if (!pawn.data.bNoPickups)
                            {
                                this.dropCharacterEquipment(pawn, "melee");
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data["id"],
                                    index: 2,
                                    slot: "melee",
                                    value: weaponData["id"],
                                    type: GameServer.INV_EQUIPMENT_SET,
                                    sfxId: "wpn_ammo"
                                });
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data["id"],
                                    index: 2,
                                    item: weaponData,
                                    type: GameServer.INV_ITEM_REPLACE
                                });
                                this.removeNextStep(_interactable);
                            }
                        }
                        else if (weaponData.type == Weapon.TYPE_GRENADE)
                        {
                            var grenade = pawn.data.grenade;
                            if (grenade && grenade.id == weaponData.id)
                            {                                
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data["id"],
                                    slot: "grenade",
                                    value: 1,
                                    type: GameServer.INV_EQUIPMENT_ADD,
                                    sfxId: "wpn_ammo"
                                });
                                this.removeNextStep(_interactable);                                
                            }
                            else if (!pawn.data.bNoPickups)
                            {
                                this.dropCharacterEquipment(pawn, "grenade");
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data["id"],
                                    slot: "grenade",
                                    value: weaponData["id"],
                                    type: GameServer.INV_EQUIPMENT_SET,
                                    sfxId: "wpn_ammo"
                                });
                                this.removeNextStep(_interactable);
                            }
                        }
                        else if (weaponData["bEquipment"])
                        {
                            var equipment = pawn.data.equipment;
                            if (equipment && equipment.id == weaponData.id)
                            {
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data["id"],
                                    slot: "equipment",
                                    value: 1,
                                    type: GameServer.INV_EQUIPMENT_ADD,
                                    sfxId: "wpn_ammo"
                                });
                                this.removeNextStep(_interactable);
                            }
                            else if (!pawn.data.bNoPickups)
                            {
                                this.dropCharacterEquipment(pawn, "equipment");
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                    pawnId: pawn.data["id"],
                                    slot: "equipment",
                                    value: weaponData["id"],
                                    type: GameServer.INV_EQUIPMENT_SET,
                                    sfxId: "wpn_ammo"
                                });
                                this.removeNextStep(_interactable);
                            }
                        }
                        else
                        {
                            var inventory = pawn.data["inventory"];
                            var itemIndex = this.getCharacterInventoryItemIndex(pawn, weaponData["id"]);
                            if (itemIndex >= 0)
                            {
                                if (!this.isMeleeWeapon(weaponData))
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data["id"],
                                        index: itemIndex,
                                        value: (weaponData["mag"] + weaponData["ammo"]),
                                        type: GameServer.INV_AMMO_ADD,
                                        sfxId: "wpn_ammo",
                                        barrelAmmo: weaponData["barrelAmmo"]
                                    });
                                    this.removeNextStep(_interactable);
                                }
                            }
                            else if (!pawn.data["bNoPickups"])
                            {
                                if (!inventory[1])
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data["id"],
                                        index: 1,
                                        item: weaponData,
                                        type: GameServer.INV_ITEM_REPLACE
                                    });
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data.id,
                                        value: 1,
                                        type: GameServer.INV_CURRENT_INVENTORY_INDEX
                                    });
                                }
                                else if (inventory.length <= 1)
                                {
                                    if (inventory[0] && inventory[0].id == "none")
                                    {
                                        this.requestEvent({
                                            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                            pawnId: pawn.data["id"],
                                            index: 0,
                                            item: weaponData,
                                            type: GameServer.INV_ITEM_REPLACE
                                        });
                                    }
                                    else
                                    {
                                        this.requestEvent({
                                            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                            pawnId: pawn.data["id"],
                                            item: weaponData,
                                            type: GameServer.INV_ITEM_ADD,
                                            sfxId: "wpn_ammo"
                                        });
                                    }
                                }
                                else
                                {
                                    var meleeIndex = pawn.data["currentInventoryIndex"];
                                    for (var i = 0; i < inventory.length; i++)
                                    {
                                        var item = inventory[i];
                                        if (item && item.id == "none")
                                        {
                                            meleeIndex = i;
                                            break;
                                        }
                                    }
                                    meleeIndex = Math.min(1, meleeIndex);
                                    this.dropCharacterWeapon(pawn, meleeIndex);
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data["id"],
                                        index: meleeIndex,
                                        item: weaponData,
                                        type: GameServer.INV_ITEM_REPLACE
                                    });
                                    if (meleeIndex >= 0)
                                    {
                                        this.requestEvent({
                                            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                            pawnId: pawn.data.id,
                                            value: meleeIndex,
                                            type: GameServer.INV_CURRENT_INVENTORY_INDEX
                                        });
                                    }
                                }
                                this.removeNextStep(_interactable);
                            }
                        }
                    }
                    break;
            }
            if (data.itemData && data.itemData.uses != null)
            {
                data.itemData.uses--;
                if (data.itemData.uses <= 0)
                {
                    this.removeNextStep(_interactable);
                }
            }
        }
    }

    setPlayerControllable(_playerId, _controllable)
    {
        var pawn = this.getObjectById(_playerId);
        if (pawn)
        {
            _controllable.data.controllerId = _playerId;
        }
        var ps = this.getPlayerById(_playerId);
        if (ps)
        {
            ps.controllableId = _controllable.data.id;               
            this.onEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE,
                playerId: ps.id,
                data: {
                    controllableId: ps.controllableId
                }
            });
        }
    }

    getAvailableSeatIndex(_vehicle)
    {
        if (_vehicle)
        {
            var seats = _vehicle.data.seats;
            for (var i = 0; i < seats.length; i++)
            {
                var seat = seats[i];
                if (!seat.pawnId)
                {
                    return i;
                }
            }
        }
        return null;
    }

    hasAvailableSeat(_vehicle)
    {
        return this.getAvailableSeatIndex(_vehicle) != null;
    }

    clearPlayerControllable(_id, _bEject)
    {
        var pawn = this.getObjectById(_id);
        var controllable = this.getObjectById(pawn.data.controllableId);
        if (controllable)
        {
            if (this.isVehicle(controllable))
            {
                this.exitVehicle(pawn, _bEject);
            }
            delete pawn.data.controllableId;
            controllable.data.controllerId = null;
        }
        var ps = this.getPlayerById(_id);
        if (ps)
        {
            ps.controllableId = null;
            this.onEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE,
                playerId: _id,
                data: {
                    controllableId: null
                }
            });
        }
        if (pawn)
        {
            pawn.data.bCrouching = false;
        }
    }

    startInteraction(_pawn, _interactable)
    {
        var data = _pawn.data;
        if (_interactable && this.characterCanInteract(_pawn, _interactable))
        {
            if (_interactable.data["bLimitInteractions"])
            {
                _interactable.data["currentPawnId"] = data["id"];
            }
            var interactData = _interactable.data.itemData;
            var interactTime = interactData ? interactData["interactTime"] : 0;
            if (interactTime > 0)
            {
                switch (_interactable.data.type)
                {
                    case "crate":
                        if (interactData["ownerId"] && interactData["ownerId"] != data["id"])
                        {
                            //interactTime = this.game.settings.fps * 3;
                        }
                        break;
                    case "reviver":
                        this.onEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_START_REVIVE
                        });
                        break;
                }
                this.cancelCharacterBoltPull(_pawn);
                this.cancelCharacterReload(_pawn);
                _pawn.velocity[0] = 0;
                data.bInteracting = true;
                data.interactTimer = interactTime;
                data.interactableId = _interactable.data.id;
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_START_INTERACTION,
                    timer: interactTime
                });
            }
            else
            {
                if (this.isVehicle(_interactable))
                {
                    if (this.canEnterVehicle(_pawn, _interactable))
                    {
                        this.executeInteractable(_interactable, data.id);
                    }
                }
                else
                {
                    this.executeInteractable(_interactable, data.id);
                }
            }
        }
    }

    attemptInteract(_id)
    {
        if (!this.matchInProgress())
        {
            return;
        }
        var pawn = this.getObjectById(_id);
        var ps = this.getPlayerById(_id);
        if (ps && ps.controllableId)
        {
            var controllable = this.getObjectById(ps.controllableId);
            if (controllable)
            {
                switch (controllable.data.type)
                {
                    //TODO
                }
            }
            if (this.canExitVehicle(pawn))
            {
                this.clearPlayerControllable(ps.id);
            }
        }
        else
        {              
            if (!pawn)
            {
                return;
            }
            var data = pawn.data;            
            var interactable = this.getInteractableForPawn(pawn);
            //If no interactable to interact with
            if (!interactable)
            {
                var equipment = data.equipment;
                if (equipment)
                {
                    switch (equipment.id)
                    {
                        case "c4":
                            var grenades = this.getGrenades(data.id, "c4");
                            for (var i = 0; i < grenades.length; i++)
                            {
                                this.detonate(grenades[i]);
                            }
                            break;
                    }
                }
            }
            else
            {
                if (!data.bBot && data.bInteracting)
                {
                    this.stopCharacterInteract(pawn);
                }
                else
                {
                    this.startInteraction(pawn, interactable);
                }
            }
        }
    }

    getTouchingVehicle(_body, _bHealable)
    {
        var objects = this.getVehicles();
        for (var i = 0; i < objects.length; i++)
        {
            var obj = objects[i];
            if (obj.data.health)
            {
                if (obj.getAABB().overlaps(_body.getAABB()))
                {
                    if (_bHealable && obj.data.health >= obj.data.maxHealth)
                    {
                        continue;
                    }
                    return obj;
                }
            }
        }
        return null;
    }

    getNearbyVehicle(_body)
    {
        var arr = [];
        var objects = this.getVehicles();
        for (var i = 0; i < objects.length; i++)
        {
            var obj = objects[i];
            if (!obj.data.bPendingRemoval && (obj.data.team == -1 || obj.data.team == _body.data.team) && this.hasAvailableSeat(obj) && this.DistBodies(obj, _body) < 1000)
            {
                arr.push(obj);
            }
        }
        if (arr.length > 0)
        {
            return arr[this.Random(0, arr.length - 1)];
        }
        return null;
    }

    getBestInteractable(_body)
    {
        var objects = this.getVehicles();
        objects = objects.concat(this.getRevivers());
        for (var i = 0; i < objects.length; i++)
        {
            var obj = objects[i];
            if (!obj.data.bPendingRemoval)
            {
                if (obj.getAABB().overlaps(_body.getAABB()))
                {
                    return obj;
                }
            }
        }
        return null;
    }

    getInteractables()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "car":
                    case "helicopter":
                    case "tank":
                    case "mountedWeapon":
                        if (cur.data.health && this.hasAvailableSeat(cur))
                        {
                            arr.push(cur);
                        }
                        break;
                    case "crate":
                    case "droppedWeapon":
                    case "door":
                    case "lever":
                    case "reviver":
                        arr.push(cur);
                        break;
                    case "equipment":
                        if (cur.data.weaponData.id == "ammo_box")
                        {
                            arr.push(cur);
                        }
                        break;
                }
            }
        }
        arr.sort((a, b) =>
        {
            var valA = a.data.value != null ? a.data.value : -1;
            var valB = b.data.value != null ? b.data.value : -1;
            if (valA > valB) return -1;
            if (valA < valB) return 1;
            return 0;
        })
        return arr;
    }

    getInteractableForPawn(_body)
    {
        var objects = this.getInteractables(); //this.getDroppedWeapons().concat(this.getCrates()).concat(this.getEquipment("ammo_box")).concat(this.getVehicles()).concat(this.getDoors()).concat(this.getMountedWeapons()).concat(this.getLevers());
        for (var i = 0; i < objects.length; i++)
        {
            var obj = objects[i];
            if (!obj.data.bPendingRemoval)
            {
                if (obj.getAABB().overlaps(_body.getAABB()))
                {
                    if (this.isVehicle(obj) && !this.hasAvailableSeat(obj))
                    {
                        continue;
                    }
                    return obj;
                }
            }
        }
        return null;
    }

    stopCharacterInteract(_pawn)
    {
        var data = _pawn.data;
        if (data.interactableId)
        {
            var interactable = this.getObjectById(data["interactableId"]);
            if (interactable && interactable.data["bLimitInteractions"])
            {
                delete interactable.data["currentPawnId"];
            }
        }
        data["bInteracting"] = false;
        delete data["interactableId"];
        delete data["interactTimer"];
        this.requestEvent({
            eventId: GameServer.EVENT_PAWN_ACTION,
            pawnId: data["id"],
            type: GameServer.PAWN_END_INTERACTION
        });
    }

    characterCanJump(_body)
    {
        var data = _body.data;
        var ps = this.getPlayerById(data.id);
        if (ps && ps.controllableId)
        {
            return false;
        }
        if (data.bClimbing)
        {
            return true;
        }
        return this.characterCanMove(_body) && !data.bStunned && !data.bFlashed && !data.bLadderCooldown && this.isOnGround(_body);
    }

    characterCanCrouch(_body)
    {
        var data = _body.data;
        if (data.bBot && data.bLadderCooldown)
        {
            return false;
        }
        return !data.bClimbing && !data.bParachute;
    }

    characterCanSprint(_body)
    {
        var data = _body.data;
        return !data.bCrouching && !data.bClimbing && data.bWantsToMove && !data.bStunned && !data.bFlashed && data.bOnGround && !data.bParachute && !data.controllableId;
    }

    characterCanClimb(_body)
    {
        var data = _body.data;
        if (data.controllableId)
        {
            return false;
        }
        if (!data.bBot && data.bLadderCooldown)
        {
            return false;
        }
        return !data.bUseDelay && !data.bEquipmentDelay && !data.bCrouching && !data.controllableId && !data.bParachute;
    }

    onStartWeaponFire(_body)
    {
        var cur = this.getCurrentCharacterInventoryItem(_body);
        if (cur)
        {
            switch (cur.id)
            {
                case "flamethrower":
                case "minigun":
                    this.requestEvent({
                        eventId: GameServer.EVENT_PAWN_ACTION,
                        pawnId: _body.data.id,
                        type: GameServer.PAWN_START_FLAME
                    });
                    _body.data.weapon.bStartFlame = true;
                    break;
            }
        }
    }

    onEndWeaponFire(_body)
    {
        var cur = this.getCurrentCharacterInventoryItem(_body);
        if (cur)
        {
            switch (cur.id)
            {
                //TODO
            }
        }
    }

    getCurrentCharacterInventoryItem(_body, _bBarrel = true)
    {
        var item = _body.data.inventory[_body.data.currentInventoryIndex];
        if (_bBarrel)
        {
            if (item && item.bBarrel && item.barrel)
            {
                return item.barrel;
            }
        }
        return item;
    }

    getCharacterInventoryItemIndex(_body, _itemId)
    {
        var inventory = _body.data.inventory;
        for (var i = 0; i < inventory.length; i++)
        {
            var item = inventory[i];
            if (item && item.id == _itemId)
            {
                return i;
            }
        }
        return -1;
    }

    reloadCharacterWeapon(_body, _bManual)
    {
        if (this.characterCanReload(_body))
        {
            var data = _body.data;
            var item = this.getCurrentCharacterInventoryItem(_body, false);
            data.reloadTimer = _body.data.reloadTimerMax;
            data.bReloading = true;
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_RELOAD,
                bManual: _bManual,
                bBarrel: item.bBarrel
            });
        }
    }

    seatCanInput(_body)
    {
        var seat = this.getSeatData(_body);
        if (seat)
        {
            return seat.bInput;
        }
        return true;
    }

    characterCanReload(_body)
    {
        var data = _body.data;
        var ps = this.getPlayerById(data.id);
        if (!this.seatCanInput(_body))
        {
            return false;
        }
        var item = this.getCurrentCharacterInventoryItem(_body);
        if (item.bMelee)
        {
            return false;
        }
        var weapon = data.weapon;
        var bAmmoCheck = item && (item.mag < item.magSize) && (item.ammo > 0 || weapon.bUnlimitedAmmo);
        return !data.bInteracting && !data.bClimbing && !this.characterHasWeaponDelay(_body) && !data.bReloading && bAmmoCheck;
    }

    triggerCharacterEquipment(_data, _slot)
    {
        if (!this.matchInProgress())
        {
            return;
        }
        var pawn = this.getObjectById(_data.playerId);
        if (pawn)
        {
            var item = pawn.data[_slot];
            if (item)
            {
                if (item.ammo > 0)
                {
                    this.useCharacterEquipment(pawn, _slot, _data.worldX, _data.worldY);
                }
                else
                {
                    switch (item.id)
                    {
                        case "c4":
                            var grenades = this.getGrenades(pawn.data.id, "c4");
                            for (var i = 0; i < grenades.length; i++)
                            {
                                this.detonate(grenades[i]);
                            }
                            break;
                        case "blowtorch":
                            this.requestEvent({
                                eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                pawnId: pawn.data.id,
                                type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                                value: Character.INDEX_EQUIPMENT
                            });
                            break;
                    }
                }
            }
        }
    }

    getNumCharactersOnTeam(_team)
    {
        var world = this.game.world;
        var num = 0;
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "character":
                        if (cur.data.health && cur.data.team == _team)
                        {
                            num++;
                        }
                        break;
                }
            }
        }
        return num;
    }

    getCharacters()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "character":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getNearbyRequest(_body, _request, _dist = 500)
    {
        var data = _body.data;
        var allies = this.getCharactersOnTeam(data.team);
        for (var i = 0; i < allies.length; i++)
        {
            var ally = allies[i];
            if (ally.data.id != data.id)
            {
                if (ally.data.currentRequest == _request)
                {
                    if (!data.controllableId || _request == Commands.VEHICLE)
                    {
                        var dist = this.Dist(ally.position[0], ally.position[1], _body.position[0], _body.position[1]);
                        if (dist < _dist)
                        {
                            return ally.position;
                        }
                    }
                }
            }
        }
        return null;
    }

    getCharactersOnTeam(_team)
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "character":
                        if (cur.data.team == _team)
                        {
                            arr.push(cur);
                        }
                        break;
                }
            }
        }
        return arr;
    }

    getHelicopters()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data && cur.data.health)
            {
                switch (cur.data.type)
                {
                    case "helicopter":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getDoors()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "door":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getLevers()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "lever":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getRevivers()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "reviver":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getReviverByPlayerId(_playerId)
    {
        var revivers = this.getRevivers();
        if (revivers)
        {
            for (var i = 0; i < revivers.length; i++)
            {
                var reviver = revivers[i];
                if (reviver.data.itemData.playerId == _playerId)
                {
                    return reviver;
                }
            }
        }
        return null;
    }

    getCrates()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "crate":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    changeTeam(_id, _team)
    {
        var ps = this.getPlayerById(_id);
        if (ps)
        {
            ps.team = _team;
            this.setCurrentClass(ps, ps.currentClass);
            this.requestEvent({
                eventId: GameServer.EVENT_MESSAGE_ADD,
                data: {
                    bInfofeed: true,
                    message: "STR_X_SWITCHED_TEAM",
                    messageParams: [ps.name]
                }
            });
        }
        var pawn = this.getObjectById(_id);
        if (pawn)
        {
            this.setDataValue(pawn, "team", _team);
            this.setDataValue(pawn, "avatar", ps.avatar);
            var controllable = this.getObjectById(pawn.data.controllableId);
            if (controllable)
            {
                this.setDataValue(controllable, "team", _team);
            }
            this.killPawn(pawn.data.id);
        }        
    }

    getDisposableCrates()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "crate":
                        if (cur.data.bDisposable)
                        {
                            arr.push(cur);
                        }
                        break;
                }
            }
        }
        return arr;
    }

    getFlags()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "flag":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getDroppedWeapons()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "droppedWeapon":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getMountedWeapons()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "mountedWeapon":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getVehicles()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data && cur.data.health)
            {
                if (this.isVehicle(cur))
                {
                    arr.push(cur);
                }
            }
        }
        return arr;
    }

    getCars()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data && cur.data.health)
            {
                switch (cur.data.type)
                {
                    case "car":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getTanks()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data && cur.data.health)
            {
                switch (cur.data.type)
                {
                    case "tank":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getObstacles()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data && cur.data.health)
            {
                switch (cur.data.type)
                {
                    case "obstacle":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    hasNearbyJammer(_body)
    {
        var world = this.game.world;
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "equipment":
                        if (cur.data.team != _body.data.team && cur.data.weaponData.id == "jammer")
                        {
                            if (this.DistBodies(_body, cur) <= cur.data.weaponData.radius)
                            {
                                return true;
                            }
                        }
                        break;
                }
            }
        }
        return false;
    }

    getEquipment(_weaponId)
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "equipment":
                        if (_weaponId)
                        {
                            if (cur.data.weaponData.id == _weaponId)
                            {
                                arr.push(cur);
                            }
                        }
                        else
                        {
                            arr.push(cur);
                        }
                        break;
                }
            }
        }
        return arr;
    }

    getNearbyFlare(_body)
    {
        var world = this.game.world;
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "rocket":
                        if (cur.data.rocketData.weaponId == "rocket_flare" && cur.data.team != _body.data.team)
                        {
                            if (this.DistBodies(_body, cur) < 1500)
                            {
                                return cur;
                            }
                        }
                        break;
                }
            }
        }
        return null;
    }

    getRockets()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "rocket":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    getGrenades(_playerId, _weaponId)
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "grenade":
                        if (_weaponId && cur.data.grenadeData.weaponId != _weaponId)
                        {
                            continue;
                        }
                        if (_playerId)
                        {
                            if (_playerId == cur.data.grenadeData.playerId)
                            {
                                arr.push(cur);
                            }
                        }
                        else
                        {
                            arr.push(cur);
                        }
                        break;
                }
            }
        }
        return arr;
    }

    useCharacterEquipment(_body, _slot, _worldX, _worldY)
    {
        if (!this.characterCanUseEquipment(_body, _slot))
        {
            return;
        }
        var data = _body.data;
        var item = data[_slot];
        var bUse = true;
        var equipmentRot = data["desiredAimRotation"] ? data["desiredAimRotation"] : data["aimRotation"];
        switch (item["type"])
        {
            case Weapon.TYPE_GRENADE:
                data.weapon.bThrowDelay = true;
                data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.4);
                var velocity = Math.min(1200, this.Dist(_worldX, _worldY, _body.position[0], _body.position[1]) * 2);
                var offset = 0; //60;
                var grenadeRad = data["bBot"] ? this.Angle(_body.position[0], _body.position[1], _worldX, _worldY) : equipmentRot;
                this.createGrenade([_body.position[0] + (Math.cos(grenadeRad) * offset), (_body.position[1] - 30) + (Math.sin(grenadeRad) * offset)], {
                    team: data.team,
                    playerId: data.id,
                    causerId: data.id,
                    rotation: grenadeRad,
                    velocity: velocity,
                    damage: item["damage"],
                    weaponId: item.id,
                    bStartDetonationAfterHit: item["bStartDetonationAfterHit"],
                    bImpact: item["bImpact"]
                });
                this.requestEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    type: GameServer.PAWN_THROW_GRENADE,
                    weaponId: item.id
                });
                break;

            default:
                switch (item.id)
                {
                    case "ammo_box":
                        /*
                        var crate = this.createCrate(_body.position, {
                            team: _body.data.team,
                            ownerId: _body.data.id,
                            interactTime: this.game.settings.fps * 0.5,
                            type: Crate.AMMO,
                            uses: 10,
                            frame: item.id
                        });
                        crate.data.destroyTimer = this.game.settings.fps * 60;
                        var force = Math.min(400, this.Dist(_worldX, _worldY, _body.position[0], _body.position[1]) * 4);
                        crate.applyImpulse([Math.cos(equipmentRot) * force, Math.sin(equipmentRot) * force], 0, 0);
                        */
                        var ammoBox = this.createEquipment([_body.position[0], _body.position[1] - 30], data.team, data.scale, data.id, item);
                        ammoBox.data.itemData = {
                            uses: 10,
                            interactTime: this.game.settings.fps * 0.5
                        };
                        ammoBox.data.destroyTimer = this.game.settings.fps * 60;
                        var force = Math.min(400, this.Dist(_worldX, _worldY, _body.position[0], _body.position[1]) * 5);
                        ammoBox.applyImpulse([Math.cos(equipmentRot) * force, Math.sin(equipmentRot) * force], 0, 0);
                        data.weapon.bThrowDelay = true;
                        data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.5);
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_THROW_GRENADE,
                            weaponId: item.id
                        });
                        break;

                    case "molotov":
                        data.weapon.bThrowDelay = true;
                        data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.4);
                        var velocity = Math.min(1200, this.Dist(_worldX, _worldY, _body.position[0], _body.position[1]) * 2);
                        var offset = 0; //60;
                        var grenadeRad = data["bBot"] ? this.Angle(_body.position[0], _body.position[1], _worldX, _worldY) : equipmentRot;
                        this.createGrenade([_body.position[0] + (Math.cos(grenadeRad) * offset), (_body.position[1] - 30) + (Math.sin(grenadeRad) * offset)], {
                            team: data.team,
                            playerId: data.id,
                            causerId: data.id,
                            rotation: grenadeRad,
                            velocity: velocity,
                            damage: item["damage"],
                            weaponId: item.id,
                            bStartDetonationAfterHit: item["bStartDetonationAfterHit"],
                            bImpact: item["bImpact"]
                        });
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_THROW_GRENADE,
                            weaponId: item.id
                        });
                        break;

                    case "c4":
                        var curC4s = this.getGrenades(data.id, "c4");
                        if (curC4s.length >= 4)
                        {
                            this.removeNextStep(curC4s[0]);
                        }
                        data.weapon.bThrowDelay = true;
                        data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.3);
                        var velocity = Math.min(600, this.Dist(_worldX, _worldY, _body.position[0], _body.position[1]) * 4);
                        var offset = 0; //60;
                        this.createGrenade([_body.position[0] + (Math.cos(equipmentRot) * offset), (_body.position[1] - 30) + (Math.sin(equipmentRot) * offset)], {
                            team: data.team,
                            playerId: data.id,
                            causerId: data.id,
                            rotation: equipmentRot,
                            velocity: velocity,
                            damage: item["damage"],
                            weaponId: item.id
                        });
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_THROW_GRENADE,
                            weaponId: item.id
                        });
                        break;

                    case "stim":
                        if (data["health"] >= data["maxHealth"])
                        {
                            bUse = false;
                            var ally = this.getNearestFriendlyPawn(_body, { maxRange: 100, bInjured: true, pawnTypes: ["character"] });
                            if (ally)
                            {
                                bUse = true;
                                var allyData = ally.data;
                                allyData["health"] = allyData["maxHealth"];
                                this.pushObjectDataUpdate(allyData.id, ["health"]);
                                data.weapon.bThrowDelay = true;
                                data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.5);
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PAWN_ACTION,
                                    pawnId: data.id,
                                    type: GameServer.PAWN_USE_STIM,
                                    bAlly: true
                                });
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PAWN_ACTION,
                                    pawnId: allyData.id,
                                    type: GameServer.PAWN_RECEIVE_STIM
                                });
                            }
                        }
                        else
                        {
                            data["health"] = data["maxHealth"];
                            this.pushObjectDataUpdate(data.id, ["health"]);
                            data.weapon.bThrowDelay = true;
                            data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.5);
                            this.requestEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: data.id,
                                type: GameServer.PAWN_USE_STIM
                            });
                        }
                        break;

                    case "knife":
                        data.weapon.bThrowDelay = true;
                        data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.5);
                        var velocity = 200;
                        var offset = 0;
                        this.createProjectile([_body.position[0] + (Math.cos(equipmentRot) * offset), (_body.position[1] - 30) + (Math.sin(equipmentRot) * offset)], equipmentRot, data.team, {
                            playerId: data.id,
                            causerId: data.id,
                            rotation: equipmentRot,
                            velocity: velocity,
                            damage: item["damage"],
                            weaponId: item.id
                        });
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_THROW_GRENADE,
                            weaponId: item.id
                        });
                        break;

                    case "deployable_cover":
                        data.weapon["bEquipmentDelay"] = true;
                        data.weapon["equipmentDelayTimer"] = Math.round(this.game.settings.fps * 0.3);
                        this.createDeployableCover(this.getRandomUniqueId(), [_body.position[0], _body.position[1] + 10], data.id);
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_ACTION,
                            pawnId: data.id,
                            type: GameServer.PAWN_PLACE_EQUIPMENT,
                            equipmentId: item.id
                        });
                        break;

                    default:
                        if (item.id == "beacon")
                        {
                            this.removeEquipmentByPlayerId(data.id, "beacon");
                        }
                        if (item["bPassive"])
                        {
                            bUse = false;
                        }
                        else if (item["bThrowable"])
                        {
                            data.weapon.bThrowDelay = true;
                            data.weapon.throwDelayTimer = Math.round(this.game.settings.fps * 0.3);
                            var throwable = this.createEquipment([_body.position[0], _body.position[1] - 30], data.team, data["scale"], data.id, item);
                            if (throwable)
                            {
                                var force = Math.min(400, this.Dist(_worldX, _worldY, _body.position[0], _body.position[1]) * 4);
                                var rad = equipmentRot;
                                throwable.applyImpulse([Math.cos(rad) * force, Math.sin(rad) * force], 0, 0);
                            }
                            this.requestEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: data.id,
                                type: GameServer.PAWN_THROW_GRENADE,
                                weaponId: item.id
                            });
                        }
                        else
                        {
                            data.weapon["bEquipmentDelay"] = true;
                            data.weapon["equipmentDelayTimer"] = Math.round(this.game.settings.fps * 0.3);
                            var placeablePos = [_body.position[0] + 10, _body.position[1] + 20];
                            if (item.id == "claymore")
                            {
                                placeablePos[0] += 30 * data["scale"];
                            }
                            this.createEquipment(placeablePos, data.team, data["scale"], data.id, item);
                            this.requestEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: data.id,
                                type: GameServer.PAWN_PLACE_EQUIPMENT,
                                equipmentId: item.id
                            });
                        }
                        break;
                }
                break;
        }
        if (!bUse)
        {
            return;
        }
        this.cancelCharacterReload(_body);
        this.cancelCharacterBoltPull(_body);
        if (!data.weapon.bUnlimitedAmmo)
        {
            item.ammo--;
        }
        this.requestEvent({
            eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
            pawnId: data.id,
            type: GameServer.INV_EQUIPMENT,
            slot: _slot
        });
    }

    deployParachute(_body)
    {
        var data = _body.data;
        if (!data.bParachute)
        {
            this.cancelCharacterBoltPull(_body);
            this.cancelCharacterReload(_body);
            data.bParachute = true;
            _body.damping = this.getSharedData("character").parachuteDamping;
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_PARACHUTE,
                value: true
            });
        }
    }

    removeParachute(_body)
    {
        var data = _body.data;
        if (data.bParachute)
        {
            data.bParachute = false;
            _body.damping = this.getSharedData("character").damping;
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_PARACHUTE,
                value: false
            });
        }
    }

    triggerCharacterWeapon(_data)
    {
        var value = _data["value"];
        var pawn = this.getObjectById(_data.playerId);
        var ps = this.getPlayerById(_data.playerId);
        var controllable = ps ? this.getObjectById(ps["controllableId"]) : null;
        if (controllable)
        {
            switch (controllable.data.type)
            {
                case "rocket":
                    if (value)
                    {
                        this.detonate(controllable);
                    }
                    return;

                case "mountedWeapon":
                case "helicopter":
                case "tank":
                case "car":
                    if (pawn && pawn.data.seatIndex != null)
                    {
                        var weapons = controllable.data.weapons;
                        if (weapons)
                        {
                            var weapon = this.getVehicleWeapon(controllable, pawn.data.seatIndex);
                            if (weapon)
                            {
                                weapon.bWantsToFire = value && !pawn.data.seatTimer;
                                if (value && !pawn.data.bBot && weapon.ammo != null && weapon.ammo == 0)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PAWN_ACTION,
                                        pawnId: pawn.data.id,
                                        type: GameServer.PAWN_NO_AMMO
                                    });
                                }
                            }
                        }
                        var seat = this.getSeatData(pawn);
                        if (!seat || !seat.bInput)
                        {
                            return;
                        }
                    }
                    break;
            }
        }        
        if (pawn)
        {
            if (_data["worldPosition"])
            {
                pawn.data["inputPosition"] = _data["worldPosition"];
            }
            var cur = this.getCurrentCharacterInventoryItem(pawn);
            if (_data["value"] && !pawn.data.seatTimer)
            {
                var bPrev = pawn.data["bWantsToFire"];
                pawn.data["bWantsToFire"] = true;
                if (cur["mag"] > 0)
                {
                    if (!bPrev && !pawn.data.bReloading)
                    {
                        this.onStartWeaponFire(pawn);
                    }
                    pawn.data.weapon["bFireHandler"] = true;
                }
                else
                {
                    if (cur["ammo"] == 0 && !pawn.data.weapon["bUnlimitedAmmo"])
                    {
                        var actual = this.getCurrentCharacterInventoryItem(pawn, false);
                        if (actual.bBarrel)
                        {
                            this.toggleUnderbarrelEquipped(pawn);
                        }
                        else
                        {
                            var otherIndex = pawn.data["currentInventoryIndex"] == 1 ? 0 : 1;
                            var otherItem = pawn.data.inventory[otherIndex];
                            if (otherItem)
                            {
                                if (otherItem.mag > 0 || otherItem.ammo > 0)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PLAYER_UPDATE_INVENTORY,
                                        pawnId: pawn.data.id,
                                        type: GameServer.INV_CURRENT_INVENTORY_INDEX,
                                        value: otherIndex
                                    });
                                }
                            }
                        }
                        if (!pawn.data.bBot)
                        {
                            if (this.characterIsFree(pawn))
                            {
                                this.requestEvent({
                                    eventId: GameServer.EVENT_PAWN_ACTION,
                                    pawnId: pawn.data.id,
                                    type: GameServer.PAWN_NO_AMMO
                                });
                            }
                        }
                    }
                    else
                    {
                        this.reloadCharacterWeapon(pawn);
                    }
                }
            }
            else
            {
                if (pawn.data.bWantsToFire)
                {
                    this.onEndWeaponFire(pawn);
                }
                pawn.data.bWantsToFire = false;
            }
        }
    }

    onPlayerKill(_playerId, _damageAmount, _victimId, _causerId, _damageInfo)
    {
        var game = this.game;
        var ps = this.getPlayerById(_playerId);
        var bSuicide = _playerId == _victimId;
        var bAddToKills = true;
        var victim = this.getObjectById(_victimId);
        if (ps)
        {
            var killedBy = ps.killedBy;
            if (killedBy)
            {
                var index = killedBy.indexOf(_victimId);
                if (index >= 0)
                {
                    var bRevenge = true;
                    killedBy.splice(index);
                }
            }
            var bTeamKill = !bSuicide && (victim ? ps.team == victim.data.team : false);
            if (!bSuicide && !bTeamKill)
            {                
                var bVictimIsCharacter = victim ? victim.data["type"] == "character" : false;
                bAddToKills = bVictimIsCharacter;
                if (bAddToKills)
                {
                    ps.kills++;
                    if (_damageInfo.bHeadshot)
                    {
                        ps.headshots++;
                    }
                    if (_damageInfo.bMelee)
                    {
                        ps.melees++;
                    }
                    ps["multiKillTimer"] = this.game.settings.fps;
                    ps["multiKillCount"]++;
                    var victimPlayerState = this.getPlayerById(_victimId);
                    if (this.isTeamGameMode())
                    {
                        ps["avengerTimer"] = this.game.settings.fps;
                        if (victimPlayerState)
                        {
                            if (victimPlayerState["avengerTimer"] > 0)
                            {
                                var bAvenger = true;
                            }
                        }
                        if (victim)
                        {
                            var damagedBy = victim.data["damagedBy"];
                            if (damagedBy && damagedBy.length > 0)
                            {
                                for (var i = 0; i < damagedBy.length; i++)
                                {
                                    if (damagedBy[i] != _playerId)
                                    {
                                        let assistPlayer = this.getPlayerById(damagedBy[i]);
                                        if (assistPlayer)
                                        {
                                            assistPlayer["assists"]++;
                                            this.onEvent({
                                                eventId: GameServer.EVENT_PLAYER_UPDATE,
                                                playerId: damagedBy[i],
                                                data: {
                                                    assists: assistPlayer["assists"],
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }                   
                }
                var eventObj = {
                    eventId: GameServer.EVENT_PLAYER_UPDATE,
                    playerId: _playerId,
                    data: {
                        kills: ps["kills"],
                        headshots: ps["headshots"],
                        melees: ps["melees"],
                        currentKillstreak: ps["currentKillstreak"],
                        bRevenge: bRevenge,
                        bAvenger: bAvenger
                    }
                };
                if (game.bSurvival)
                {
                    //TODO
                }
                else
                {
                    var gameModeData = {};
                    if (victim && victim.data.type == "character")
                    {
                        if (!game.gameModeData["bFirstBlood"])
                        {
                            gameModeData["firstBloodPlayerId"] = _playerId;
                            game.gameModeData["bFirstBlood"] = true;
                        }
                    }
                    switch (game.gameModeData["id"])
                    {
                        case GameMode.DEATHMATCH:
                            if (bAddToKills)
                            {
                                gameModeData["bPlayerKill"] = true;
                                if (ps["kills"] >= game.gameModeData["scoreLimit"])
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_GAME_END,
                                        condition: MatchState.END_CONDITION_SCORE,
                                        winningTeam: ps.team
                                    });
                                }
                            }
                            break;
                        case GameMode.TEAM_DEATHMATCH:
                            if (bAddToKills)
                            {
                                var scores = game.gameModeData["scores"];
                                scores[ps.team]++;
                                gameModeData["scores"] = scores;
                                if (scores[ps.team] >= game.gameModeData["scoreLimit"])
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_GAME_END,
                                        condition: MatchState.END_CONDITION_SCORE,
                                        winningTeam: ps.team
                                    });
                                }
                            }
                            break;
                    }
                }
                this.onEvent(eventObj);
                if (gameModeData)
                {
                    if (Object.keys(gameModeData).length > 0)
                    {
                        this.onEvent({
                            eventId: GameServer.EVENT_GAME_UPDATE,
                            data: gameModeData
                        });
                    }
                }
            }
        }
    }

    triggerCallback(_id)
    {
        if (this.game.callbacks && this.game.callbacks[_id])
        {
            this.game.callbacks[_id]();
        }
    }

    onPawnDeath(_pawnId, _damageAmount, _killerId, _causerId, _damageInfo)
    {
        var bHeadshot = _damageInfo.bHeadshot;
        var ps = this.getPlayerById(_pawnId);
        var pawn = this.getObjectById(_pawnId);
        var pawnTeam = pawn.data.team;        
        var ragdoll = null;
        var vx = 0;
        var vy = 0;
        var va = Math.random(-50, 50);
        var causer = this.getObjectById(_causerId);
        if (causer)
        {
            if (_damageInfo.weaponId == "fall")
            {
                vy = _damageAmount * 10;
            }
            else
            {
                var rad = this.Angle(causer.position[0], causer.position[1], pawn.position[0], pawn.position[1]) + this.ToRad(this.Random(-5, 5));
                var force = Math.max(100, (_damageAmount * 30)) * (bHeadshot ? 1.5 : 1);
                var maxForce = _damageInfo.damageType == DamageType.DAMAGE_EXPLOSIVE ? 10000 : 7000;
                force = Math.max(1000, Math.min(force, maxForce));
                vx = Math.round(Math.cos(rad) * force);
                vy = Math.round(Math.sin(rad) * force);
            }
        }
        this.clearPlayerControllable(_pawnId);
        if (pawn.constraint)
        {
            this.game.world.removeConstraint(pawn.constraint);
            delete pawn.constraint;
        }
        switch (pawn.data.type)
        {
            case "character":
                this.triggerCallback("onPlayerKill");
                break;
            case "tank":
                this.triggerCallback("onTankKill");
                break;
            case "helicopter":
                this.triggerCallback("onHeliKill");
                break;
        }
        switch (pawn.data.type)
        {
            case "obstacle":
                switch (pawn.data.obstacleId)
                {
                    case "barrel_explosive":
                        this.detonate(pawn);
                        break;
                    default:
                        this.removeNextStep(pawn);
                        break;
                }
                break;

            case "grenade":
                if (pawn.data.weaponId == "c4")
                {
                    if (!_data.bMelee)
                    {
                        this.detonate(body);
                    }
                }
                this.removeNextStep();
                break;

            case "tank":
            case "car":
            case "mountedWeapon":
                var seats = pawn.data.seats;
                for (var i = 0; i < seats.length; i++)
                {
                    var seat = seats[i];
                    if (seat.pawnId)
                    {
                        var seatPawnId = seat.pawnId;
                        this.exitVehicle(this.getObjectById(seatPawnId));
                        this.clearPlayerControllable(seatPawnId);                        
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_DAMAGE,
                            damageType: DamageType.DAMAGE_EXPLOSIVE,
                            damageAmount: pawn.data.maxHealth,
                            pawnId: seatPawnId,
                            attackerId: _killerId,
                            causerId: _causerId,
                            weaponId: _damageInfo["weaponId"],
                            bDirectlyCausedByPlayer: false
                        });
                    }
                }
                pawn.applyImpulse([this.Random(-500, 500), this.Random(-250, -1000)]);
                pawn.angularVelocity = this.Random(-25, 25);
                pawn.data.destroyTimer = this.game.settings.fps * 5;
                this.createExplosion({
                    eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                    x: pawn.position[0],
                    y: pawn.position[1],
                    radius: 500,
                    damage: Settings.VEHICLE_EXPLOSION_DAMAGE,
                    playerId: null,
                    causerId: null,
                    weaponId: null
                });
                break;

            case "helicopter":
                var seats = pawn.data.seats;
                for (var i = 0; i < seats.length; i++)
                {
                    var seat = seats[i];
                    if (seat.pawnId)
                    {
                        var seatPawnId = seat.pawnId;
                        this.exitVehicle(this.getObjectById(seatPawnId));
                        this.clearPlayerControllable(seatPawnId);
                        this.requestEvent({
                            eventId: GameServer.EVENT_PAWN_DAMAGE,
                            damageType: DamageType.DAMAGE_EXPLOSIVE,
                            damageAmount: pawn.data.maxHealth,
                            pawnId: seatPawnId,
                            attackerId: _killerId,
                            causerId: _causerId,
                            weaponId: _damageInfo["weaponId"],
                            bDirectlyCausedByPlayer: false
                        });
                    }
                }
                if (_damageInfo.damageType == DamageType.DAMAGE_WORLD)
                {
                    this.createExplosion({
                        eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                        x: pawn.position[0],
                        y: pawn.position[1],
                        radius: 500,
                        damage: Settings.VEHICLE_EXPLOSION_DAMAGE,
                        playerId: null,
                        causerId: null,
                        weaponId: null
                    });
                    this.removeNextStep(pawn);
                }
                else
                {
                    pawn.data.destroyTimer = this.game.settings.fps * 5;
                    pawn.gravityScale = 1;
                    pawn.angularForce += this.Random(-10, 10);
                    pawn.shapes[0].collisionGroup = CollisionGroups.PAWN;
                    pawn.shapes[0].collisionMask = CollisionGroups.GROUND;
                }
                break;

            case "character":
                var weapon = this.getWeaponData(_damageInfo["weaponId"]);
                var bGib = false;
                if (_damageInfo.damageType == DamageType.DAMAGE_EXPLOSIVE)
                {
                    bGib = pawn.data["bZombie"] ? true : (this.RandomBoolean() && _damageAmount >= 100);
                }
                if (weapon && !bGib)
                {
                    switch (weapon["round"])
                    {
                        case "50bmg":
                        case "408":
                            bGib = true;
                            break;
                    }
                    switch (weapon["type"])
                    {
                        case Weapon.TYPE_SHOTGUN:
                            bGib = _damageInfo["bNearshot"];
                            break;
                        default:
                            bGib = _damageAmount > 200 && !bHeadshot;
                            break;
                    }
                    switch (weapon.id)
                    {
                        case "melee_katana":
                        case "melee_machete":
                        case "melee_hatchet":
                        case "minigun":
                        case "gatling":
                        case "m2":
                        case "mg42":
                            bGib = true;
                            break;
                    }
                }
                var bGibHeadshot = bHeadshot && _damageAmount >= 100;

                ragdoll = {
                    id: this.getRandomUniqueId(),
                    x: Math.round(pawn.position[0]),
                    y: Math.round(pawn.position[1]),
                    type: "ragdoll",
                    vx: -vx,
                    vy: -vy,
                    va: va,
                    data: {
                        bHeadshot: bGibHeadshot,
                        damageAmount: _damageAmount,
                        type: "character",
                        bGib: bGib
                        //avatarData: pawn.data["avatarData"]
                    },
                    playerId: _pawnId
                };
                if (this.Random(1, 10) == 1 || _damageInfo.damageType == DamageType.DAMAGE_MELEE)
                {
                    //this.dropCharacterWeapon(pawn, pawn.data["currentInventoryIndex"]);
                }
                if (pawn.data["interactableId"])
                {
                    var interactable = this.getObjectById(pawn.data["interactableId"]);
                    if (interactable && interactable.data["bLimitInteractions"])
                    {
                        delete interactable.data["currentPawnId"];
                    }
                }
                if (this.Random(1, 3) == 1)
                {
                    this.dropCharacterWeapon(pawn, pawn.data.currentInventoryIndex);
                }
                this.removeNextStep(pawn);
                break;

            default:
                this.removeNextStep(pawn);
                break;
        }
        if (ps)
        {
            ps["deaths"]++;
            var killedBy = ps["killedBy"];
            if (killedBy)
            {
                if (_killerId)
                {
                    if (killedBy.indexOf(_killerId) == -1)
                    {
                        killedBy.push(_killerId);
                    }
                }
            }
            this.endMultiKill(ps);
            this.onEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE,
                playerId: _pawnId,
                data: {
                    deaths: ps["deaths"],
                    currentKillstreak: ps["currentKillstreak"],
                    bHasPawn: false
                }
            });
            if (ps["controllableId"])
            {
                var controllable = this.getObjectById(ps["controllableId"]);
                if (controllable)
                {
                    switch (controllable.data["type"])
                    {
                        case "turret":
                            this.clearPlayerControllable(ps.id);
                            break;
                    }
                }
            }
        }
        var useCauserId = _causerId;
        if (causer)
        {
            switch (causer.data.type)
            {
                case "rocket":
                    useCauserId = causer.data.rocketData.causerId;
                    break;
                case "grenade":
                    useCauserId = causer.data.grenadeData.playerId;
                    break;
            }
        }
        var bReviver = this.game.gameModeData.bAllowRevives && pawnTeam == 0;        
        this.onEvent({
            eventId: GameServer.EVENT_PAWN_DIE,
            data: {
                id: _pawnId,
                damageAmount: _damageAmount,
                killerId: _killerId,
                causerId: useCauserId,
                damageInfo: _damageInfo,
                ragdoll: ragdoll,
                bReviver: bReviver
            }
        });
        if (bReviver)
        {
            this.createReviver(pawn.position, [vx, vy], va, this.game.bOperation, {
                playerId: _pawnId,
                interactTime: this.game.settings.fps * 1
            });
        }
        if (this.game.bSurvival)
        {
            if (pawnTeam == 0)
            {
                if (this.getNumCharactersOnTeam(0) <= 0)
                {
                    this.requestEvent({
                        eventId: GameServer.EVENT_GAME_END,
                        condition: MatchState.END_CONDITION_KIA,
                        result: MatchState.END_RESULT_LOSS
                    });
                }
            }
            else
            {
                this.game.gameModeData.enemiesRemaining--;
                this.onEvent({
                    eventId: GameServer.EVENT_GAME_UPDATE,
                    data: {
                        enemiesRemaining: this.game.gameModeData.enemiesRemaining
                    }
                });
                if (this.game.gameModeData.enemiesRemaining <= 0)
                {
                    this.onSurvivalWaveComplete();
                }
            }
        }
    }

    createReviver(_position, _velocity, _angularVelocity, _bBleedTimer, _data)
    {
        var shared = this.getSharedData("reviver");
        var body = new p2.Body({
            mass: shared.mass,
            damping: shared.damping,
            position: _position
        });
        body.data = {
            id: this.getRandomUniqueId(),
            x: _position[0],
            y: _position[1],
            type: "reviver",
            bLimitInteractions: true,
            itemData: _data,
            value: 10
        };
        if (_bBleedTimer)
        {
            var bleedTimerMax = 30;
            if (this.localData["bOperation"])
            {
                bleedTimerMax = 30 - (this.localData["difficulty"] * 5);
            }
            body.data["bleedTimerMax"] = this.localData.settings.fps * bleedTimerMax;
            body.data["bleedTimer"] = body.data["bleedTimerMax"];
        }
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM
        });
        body.addShape(shape);
        this.addWorldBody(body);

        body.applyImpulse([_velocity[0], _velocity[1]], 0, 0);
        body.angularVelocity = _angularVelocity;

        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "reviver",
            position: body.position,
            velocity: body.velocity,
            data: body.data
        });
        return body;
    }

    dropAllCharacterWeapons(_body)
    {
        this.dropCharacterEquipment(_body, "melee");
        this.dropCharacterEquipment(_body, "grenade");
        this.dropCharacterEquipment(_body, "equipment");
        var data = _body.data;
        var rad = data.aimRotation;
        if (data.scale == -1)
        {
            rad += this.ToRad(-180);
        }
        var inventory = data.inventory;
        for (var i = 0; i < inventory.length; i++)
        {
            var item = inventory[i];
            if (item)
            {
                if (item.bZombie || item.id == "none")
                {
                    continue;
                }
                var force = this.Random(100, 150);
                var vx = (Math.cos(data.aimRotation) * force);
                var vy = (Math.sin(data.aimRotation) * force);
                this.createDroppedWeapon(
                    [_body.position[0], _body.position[1] - 30],
                    {
                        rotation: rad + this.ToRad(i * 30),
                        scale: data.scale,
                        weaponData: item,
                        velocity: [vx, vy],
                        angularVelocity: this.Random(0, 5)
                    }
                );
            }
        }    
    }

    dropCharacterEquipment(_body, _slot)
    {
        var data = _body.data;
        var rad = data.aimRotation;
        if (data.scale == -1)
        {
            rad += this.ToRad(-180);
        }
        var item = data[_slot];        
        if (item && (item.ammo > 0 || item.type == Weapon.TYPE_MELEE))
        {
            if (item.id == "none")
            {
                return;
            }
            var force = this.Random(100, 150);
            var vx = (Math.cos(data.aimRotation) * force);
            var vy = (Math.sin(data.aimRotation) * force);
            this.createDroppedWeapon(
                [_body.position[0], _body.position[1] - 30],
                {
                    rotation: rad,
                    scale: data.scale,
                    weaponData: this.clone(item),
                    velocity: [vx, vy],
                    angularVelocity: this.Random(0, 5)
                }
            );
        }
    }

    dropCharacterWeapon(_body, _index)
    {
        var data = _body.data;
        var rad = data.aimRotation;
        if (data.scale == -1)
        {
            rad += this.ToRad(-180);
        }
        var item = data.inventory[_index];
        if (!item || item.bZombie || item.id == "none")
        {
            return;
        }
        var force = this.Random(120, 150);
        var vx = (Math.cos(data.aimRotation) * force);
        var vy = (Math.sin(data.aimRotation) * force);
        this.createDroppedWeapon(
            [_body.position[0], _body.position[1] - 30],
            {
                rotation: rad,
                scale: data.scale,
                weaponData: item,
                velocity: [vx, vy],
                angularVelocity: this.Random(0, 5)
            }
        );
    }

    characterCanInteract(_body, _interactable)
    {
        var data = _body.data;
        var ps = this.getPlayerById(data.id);
        if (ps && ps.controllableId)
        {
            return false;
        }
        if (_interactable)
        {
            if (_interactable.data.interactTeam != null)
            {
                if (_interactable.data["interactTeam"] != data.team)
                {
                    return false;
                }
            }
            if (_interactable.data["bLimitInteractions"])
            {
                if (_interactable.data["currentPawnId"])
                {
                    return false;
                }
            }
        }
        //var dist = this.Dist(_body.position[0], _body.position[1], _interactable.position[0], _interactable.position[1]);
        return !data["bClimbing"] && !data["bInteracting"]; // && dist < 200;
    }

    characterIsFree(_body)
    {
        var data = _body.data;
        var ps = this.getPlayerById(data.id);
        if (!this.seatCanInput(_body))
        {
            return false;
        }
        if (data.bShieldCooldown)
        {
            return false;
        }
        return !data.bInteracting && !data.bClimbing && !this.characterHasWeaponDelay(_body) && !data.bReloading && !data.bParachute;
    }

    characterCanUseEquipment(_body, _slot)
    {
        var data = _body.data;
        var controllable = this.getObjectById(data.controllableId);
        if (controllable)
        {
            if (this.isVehicle(controllable))
            {
                if (_body)
                {
                    var seat = this.getSeatData(_body);
                    if (!seat || !seat.bInput)
                    {
                        return false;
                    }
                }
            }
        }        
        var item = data[_slot];
        if (!item)
        {
            return false;
        }
        else
        {
            var bGroundCheck = true;
            if ((item.bPlaceable || item.bMine) && !item.bThrowable)
            {
                bGroundCheck = data.bOnGround;
                if (!bGroundCheck)
                {
                    return false;
                }
            }
        }
        if (!item.bSprintUse && data.bSprinting)
        {
            return false;
        }
        return !data.bInteracting && !data.bClimbing && !this.characterHasWeaponDelay(_body) && !data.bShieldCooldown && !data.bParachute;
    }

    characterCanFire(_body, _bCheckMag)
    {
        if (!this.matchInProgress())
        {
            return false;
        }
        if (!this.seatCanInput(_body))
        {
            return false;
        }
        var item = this.getCurrentCharacterInventoryItem(_body);
        if (!item)
        {
            return false;
        }
        if (_bCheckMag)
        {
            var bHasMag = this.isMeleeWeapon(item) ? true : (item.mag > 0);
            if (!bHasMag)
            {
                return false;
            }
        }
        var data = _body.data;
        if (data.bClimbing)
        {
            return false;
        }
        if (item.bAirOnly)
        {
            if (!data.lockOnTargetId)
            {
                return false;
            }
        }
        var weapon = data.weapon;
        return !data.bInteracting && !data.bReloading && !this.characterHasWeaponDelay(_body) && !weapon.bBoltDelay && !data.bSprinting && !data.bShieldCooldown && !data.bParachute;
    }

    createImpactEffect(_x, _y, _rotation, _impactType, _intensity)
    {
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            data: {
                x: Math.round(_x),
                y: Math.round(_y),
                type: "impactEffect",
                rotation: this.RoundDecimal(_rotation),
                impactType: _impactType,
                intensity: _intensity
            }
        });
    }

    createImpactEffects(_items)
    {
        if (_items && _items.length > 0)
        {
            this.requestEvent({
                eventId: GameServer.EVENT_SPAWN_OBJECT,
                data: {
                    type: "impactEffect",
                    items: _items
                }
            });
        }
    }

    startSurvivalWaveIntermission()
    {
        console.log("startSurvivalWaveIntermission");
        var gameData = this.game.gameModeData;
        gameData.intermissionTimer = Settings.INTERMISSION_TIMER; //gameData.wave == 0 ? 15 : 30;
        gameData.waveTimer = this.game.settings.fps;
        this.onEvent({
            eventId: GameServer.EVENT_GAME_UPDATE,
            data: {
                timer: gameData.intermissionTimer
            }
        });
    }

    startSurvivalWave()
    {
        console.log("startSurvivalWave");
        var gameData = this.game.gameModeData;
        gameData.wave++;
        gameData.waveKills = 0;
        gameData.waveHeadshots = 0;
        gameData.waveMelees = 0;
        gameData.numEnemies = Math.min(100, 5 * gameData.wave);
        gameData.enemiesSpawned = 0;
        gameData.enemiesRemaining = gameData.numEnemies;
        gameData.spawnTimer = this.game.settings.fps;
        gameData.spawnTimerMax = gameData.spawnTimer;
        this.onEvent({
            eventId: GameServer.EVENT_GAME_UPDATE,
            data: {
                intermissionTimer: gameData.intermissionTimer,
                wave: gameData.wave,
                enemies: gameData.enemies,
                enemiesRemaining: gameData.enemiesRemaining,
                bWaveStart: true,
                timer: -1
            }
        });
    }

    spawnSurvivalEnemyHelicopter()
    {
        var map = this.getCurrentMapData();
        var wave = this.game.gameModeData.wave;
        var types = [Helicopter.MH6];
        if (wave >= 5)
        {
            types.push(Helicopter.BLACKHAWK);
        }
        if (wave >= 10)
        {
            types.push(Helicopter.COBRA, Helicopter.OH58);
        }
        if (wave >= 15)
        {
            types.push(Helicopter.OSPREY);
        }
        var heli = this.createHelicopter([map.width * 0.5, 0], {
            type: types[this.Random(0, types.length - 1)],
            team: 1,
            scale: 1
        });
        var seats = heli.data.seats;
        if (seats)
        {
            for (var i = 0; i < seats.length; i++)
            {
                var char = this.spawnSurvivalEnemyCharacter();
                this.executeInteractable(heli, char.data.id);
            }
        }
        return heli;
    }

    spawnSurvivalEnemyCharacter()
    {
        var map = this.getCurrentMapData();
        var spawnPos = map.spawns[this.Random(0, map.spawns.length - 1)].position;

        var classData = this.getBotClasses();
        var classes = [Classes.ASSAULT, Classes.ENGINEER, Classes.SUPPORT, Classes.RECON];
        var avatar = classData[classes[this.Random(0, classes.length - 1)]].avatar.ru;

        var wave = this.game.gameModeData.wave;

        var weaponTypes = [Weapon.TYPE_PISTOL, Weapon.TYPE_MACHINE_PISTOL];
        if (wave >= 10)
        {
            weaponTypes.push(Weapon.TYPE_DMR, Weapon.TYPE_SNIPER);
        }
        if (wave >= 5)
        {
            weaponTypes.push(Weapon.TYPE_CARBINE, Weapon.TYPE_RIFLE, Weapon.TYPE_LMG);
        }
        if (wave >= 3)
        {
            weaponTypes.push(Weapon.TYPE_SMG, Weapon.TYPE_SHOTGUN);
        }

        var wpns = [];
        for (var i = 0; i < weaponTypes.length; i++)
        {
            wpns = wpns.concat(this.getAllWeaponsByType(weaponTypes[i]));
        }
        var primary = this.getWeaponData(wpns[this.Random(0, wpns.length - 1)].id);
        this.setRandomWeaponMods(primary);
        var inventory = [
            {
                id: primary.id,
                mods: primary.mods
            }
        ];
        if (wave >= 10)
        {
            inventory.push({ id: "smaw" });
        }
        var grenade = null;
        var equipment = null;
        var melee = "melee_knife";        
        var botSkill = Math.min(BotSkill.SKILL_GOD, Math.floor(wave * 0.25));
        var health = this.getCharacterMaxHealth() + (wave * 50);
        var char = this.createCharacter({
            id: this.getRandomUniqueId(),
            x: spawnPos[0],
            y: spawnPos[1],
            team: 1,
            inventory: inventory,
            melee: melee,
            grenade: grenade,
            equipment: equipment,
            avatar: avatar,
            bBot: true,
            botSkill: botSkill,
            health: health
        });
        return char;
    }

    onSurvivalWaveComplete()
    {
        console.log("onSurvivalWaveComplete");
        this.startSurvivalWaveIntermission();
        var gameData = this.game.gameModeData;
        var waveBonus = gameData.wave * 100;
        waveBonus += Math.round(gameData.waveKills * 2.5);
        waveBonus += gameData.waveHeadshots * 10;
        waveBonus += gameData.waveMelees * 25;
        this.onEvent({
            eventId: GameServer.EVENT_GAME_UPDATE,
            data: {
                wave: gameData.wave,
                bWaveComplete: true,
                reward: waveBonus
            }
        });
    }

    isOnGround(_body)
    {
        if (_body)
        {
            var yAxis = p2.vec2.fromValues(0, -1);
            var bResult = false;
            var world = this.game.world;
            var len = world.narrowphase.contactEquations.length;
            for (var i = 0; i < len; i++)
            {
                var c = world.narrowphase.contactEquations[i];
                if (c.bodyA === _body || c.bodyB === _body)
                {
                    var d = p2.vec2.dot(c.normalA, yAxis);
                    if (c.bodyA === _body)
                    {
                        d *= -1;
                    }
                    if (d > 0.5)
                    {
                        bResult = true;
                    }
                }
            }
            return bResult;
        }
        return false;
    }

    respawnPlayer(_id, _position)
    {
        var ps = this.getPlayerById(_id);
        if (ps)
        {
            this.removeEquipmentByPlayerId(ps.id);
            this.removeGrenadesByPlayerId(ps.id);
            var melee = "melee_knife";
            var grenade = null;
            var equipment = null;
            if (this.game.bSurvival)
            {
                grenade = "frag";
                equipment = "stim";
                var inventory = [
                    {
                        id: "mp5",
                        mods: {
                            optic: Mods.OPTIC_EOTECH,
                            accessory: Mods.ACCESSORY_LASER,
                            ammo: Mods.AMMO_PIERCING
                        },
                        ammo: 150
                    },
                    {
                        id: "usp45",
                        ammo: 120
                    },
                    { id: melee },
                    { id: equipment },
                    { id: grenade }
                ];                
            }
            else if (this.game.bRanked)
            {
                var classData = ps.classes[ps.currentClass];
                melee = classData.melee;
                grenade = classData.grenade;
                equipment = classData.equipment;
                inventory = [
                    classData.primary,
                    classData.secondary,
                    { id: melee },
                    { id: equipment },
                    { id: grenade }
                ];
            }
            else
            {
                inventory = [
                    {
                        id: "m9"
                    },
                    null,
                    { id: melee },
                    { id: equipment },
                    { id: grenade }
                ]; 
            }
            if (_position)
            {
                var spawnPos = _position;
            }
            else if (ps.desiredSpawn && ps.desiredSpawn[0] != null && ps.desiredSpawn[1] != null)
            {                
                spawnPos = this.clone(ps.desiredSpawn);
                spawnPos[0] += this.Random(-100, 100);
            }
            else
            {
                spawnPos = this.getSpawnPointForTeam(ps.team);
                spawnPos[0] += this.Random(-100, 100);
            }
            if (!this.getObjectById(ps.id))
            {
                var char = this.createCharacter({
                    id: ps.id,
                    x: spawnPos[0],
                    y: spawnPos[1],
                    team: ps.team,
                    inventory: inventory,
                    melee: melee,
                    grenade: grenade,
                    equipment: equipment,
                    avatar: ps.avatar,
                    bBot: ps.bBot,
                    botSkill: ps.botSkill
                });
            }
            ps.respawnTimer = -1;
            ps.timer_respawn = null;
            if (this.game.gameModeData.bAllowRespawns && !ps.bBot)
            {
                ps.bAutoRespawn = false;
            }
            if (this.matchInProgress() && this.game.gameModeData.bSpawnProtection)
            {
                this.startSpawnProtectionTimer(ps.id);
            }
        }
    }

    getPlayers()
    {
        return this.game.players;
    }

    setPlayerPing(_id, _ms)
    {
        var ps = this.getPlayerById(_id);
        if (ps)
        {
            ps.ping = _ms;
            this.onEvent({
                eventId: GameServer.EVENT_PLAYER_UPDATE,
                playerId: ps.id,
                data: {
                    ping: ps.ping
                }
            });
        }
    }

    updatePlayer(_data)
    {
        if (!_data)
        {
            return;
        }
        var ps = this.getPlayerById(_data.id);
        if (ps)
        {
            var keys = Object.keys(_data);
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                ps[key] = _data[key];
            }
        }
    }

    getPlayerById(_id)
    {
        var players = this.game.players;
        for (var i = 0; i < players.length; i++)
        {
            var ps = players[i];
            if (ps.id == _id)
            {
                return ps;
            }
        }
        return null;
    }

    addWorldBody(_body)
    {
        this.game.world.addBody(_body);
        var data = _body.data;
        if (data)
        {
            if (!data.id)
            {
                console.warn("Missing id", data);
            }
            this.game.objects[data.id] = _body;
        }
    }

    removeObject(_body)
    {
        if (_body)
        {
            if (_body.data && _body.data.type == "reviver")
            {
                console.log("remove reviver", _body.data);
            }
            var world = this.game.world;
            if (_body.constraint)
            {
                world.removeConstraint(_body.constraint);
                delete _body.constraint;
            }
            var data = _body.data;
            var id = data ? data.id : undefined;
            var type = data ? data.type : null;
            delete _body.data;
            world.removeBody(_body);
            if (id)
            {
                var players = this.game.players;
                for (var i = 0; i < players.length; i++)
                {
                    var ps = players[i];
                    if (ps["controllableId"] == id)
                    {
                        this.clearPlayerControllable(ps.id);
                        break;
                    }
                }
                if (type == "rocket")
                {
                    var pawns = this.getPawns();
                    for (i = 0; i < pawns.length; i++)
                    {
                        var curPawn = pawns[i];
                        if (curPawn.data["currentRocketId"] == id)
                        {
                            delete curPawn.data["currentRocketId"];
                            break;
                        }
                    }
                }
                delete this.game.objects[id];
                this.onEvent({
                    eventId: GameServer.EVENT_REMOVE_OBJECT,
                    id: id
                });
            }
        }
    }

    createRocket(_data)
    {
        var body = new p2.Body({
            mass: 0.1,
            position: [_data.x, _data.y],
            angle: _data.angle,
            gravityScale: _data.gravityScale != null ? _data.gravityScale : 0.5
        });
        var damage = 0;
        var radius = 0;
        var velocity = 0;
        var bControllable = false;
        var bAirOnly = false;
        var bAutoLock = _data.bAutoLock == true;
        var weaponId = _data.weaponId;
        var destroyTimer = this.game.settings.fps * 5;
        switch (weaponId)
        {
            case "hellfire":
                destroyTimer = this.game.settings.fps * 10;
                damage = 1000;
                radius = 500;
                velocity = 0;
                bControllable = true;
                break;
            case "javelin":
                destroyTimer = this.game.settings.fps * 10;
                var weaponData = this.getWeaponData(weaponId);
                damage = _data["damage"] ? _data["damage"] : weaponData["damage"];
                radius = _data["radius"] ? _data["radius"] : weaponData["radius"];
                velocity = 50;
                var path = _data["path"];
                bAirOnly = _data["bAirOnly"];
                break;
            case "rocket_flare":
                var weaponData = this.getWeaponData(weaponId);
                damage = 0;
                radius = 100;
                velocity = this.Random(100, 150);
                break;
            default:
                destroyTimer = this.game.settings.fps * 5;
                var weaponData = this.getWeaponData(weaponId);
                damage = _data["damage"] ? _data["damage"] : weaponData["damage"];
                radius = _data["radius"] ? _data["radius"] : weaponData["radius"];
                bAirOnly = _data["bAirOnly"];
                bControllable = weaponData["bControllable"];
                velocity = weaponData.velocity ? weaponData.velocity : 250;
                break;
        }
        body.data = {
            id: this.getRandomUniqueId(),
            destroyTimer: destroyTimer,
            type: "rocket",
            damage: damage,
            radius: radius,
            team: _data.team,
            rocketData: _data,
            velocity: velocity,
            health: 100
        };
        if (path)
        {
            body.data["path"] = path;
        }
        if (bAutoLock)
        {
            body.data["bAutoLock"] = true;
        }
        if (bControllable)
        {
            body.data["bControllable"] = bControllable;
            body.data["health"] = 20;
        }
        var shape = new p2.Box({
            width: 50,
            height: 10,
            collisionGroup: CollisionGroups.PROJECTILE,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PAWN | CollisionGroups.VEHICLE | CollisionGroups.OBJECT
        });
        shape.sensor = true;
        body.addShape(shape);
        this.addWorldBody(body);
        if (velocity)
        {
            var rad = _data.angle;
            body.applyImpulse([Math.cos(rad) * velocity, Math.sin(rad) * velocity], 0, 0);
        }
        if (bAirOnly || _data.bCanLock)
        {
            var pawn = this.getObjectById(_data.playerId);
            if (pawn)
            {
                body.data.rocketData["enemyId"] = pawn.data.lockOnTargetId;
                if (pawn.data.lockOnTargetId)
                {
                    this.requestEvent({
                        eventId: GameServer.EVENT_PAWN_ACTION,
                        pawnId: pawn.data.lockOnTargetId,
                        type: GameServer.PAWN_LOCK_ACQUIRED,
                        bRocket: true
                    });
                }
            }
        }
        if (bControllable)
        {
            var ps = this.getPlayerById(_data.playerId);
            if (ps)
            {
                body.data.team = ps.team;
                //this.setPlayerControllable(ps, body);
            }
        }
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "rocket",
            position: body.position,
            velocity: body.velocity,
            angularVelocity: body.angularVelocity,
            rotation: body.angle,
            data: body.data
        });
        return body;
    }

    createDroppedWeapon(_position, _data)
    {
        var body = new p2.Body({
            mass: 1,
            position: _position,
            angle: _data.rotation != null ? _data.rotation : 0,
            allowSleep: true,
            sleepSpeedLimit: 1,
            sleepTimeLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            type: "droppedWeapon",
            scale: _data.scale != null ? _data.scale : 1,
            itemData: _data,
            value: 1
        };
        var weaponData = _data["weaponData"];
        var atlasData = this.getWorldWeaponData(weaponData["id"]);
        var shape = new p2.Box({
            width: atlasData.w,
            height: atlasData.h,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM
        });
        body.addShape(shape);
        this.addWorldBody(body);
        if (weaponData["ammo"] == 0 && weaponData["mag"] == 0)
        {
            body.data["destroyTimer"] = this.game.settings.fps;
        }
        if (_data.velocity)
        {
            body.applyImpulse([_data.velocity[0], _data.velocity[1]], 0, 0);
        }
        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "droppedWeapon",
            position: body.position,
            rotation: body.angle,
            velocity: body.velocity,
            angularVelocity: body.angularVelocity,
            data: body.data
        });
        var objects = this.game.world.bodies;
        var num = 0;
        var oldWeapon;
        for (var i = 0; i < objects.length; i++)
        {
            var obj = objects[i];
            if (obj.data.type == "droppedWeapon")
            {
                if (obj.data.bSpawned)
                {
                    continue;
                }
                if (!oldWeapon)
                {
                    oldWeapon = obj;
                }
                num++;
                if (num > Settings.MAX_DROPPED_WEAPONS)
                {
                    this.removeNextStep(oldWeapon);
                    break;
                }
            }
        }
        return body;
    }

    createProjectile(_position, _rotation, _team, _data)
    {
        var body = new p2.Body({
            mass: 0.1,
            position: _position,
            angle: _rotation,
            angularDamping: 0.2
        });
        var weaponData = this.getWeaponData(_data.weaponId);
        body.data = {
            id: this.getRandomUniqueId(),
            type: "projectile",
            team: _team,
            damage: weaponData.damage,
            projectileData: _data,
            sourceId: _data.sourceId
        };
        var data = body.data;
        var bCollidePawns = true;
        switch (weaponData.id)
        {
            case "crossbow":
                var shape = new p2.Box({
                    width: 30,
                    height: 10
                });
                body.gravityScale = 0.25;
                break;
            case "knife":
                shape = new p2.Circle({
                    radius: 15
                });
                body.gravityScale = 0.5;
                break;
            case "rope":
                shape = new p2.Circle({
                    radius: 30
                });
                body.gravityScale = 0;
                data.bHitSameTeam = true;
                data.destroyTimer = this.game.settings.fps * 0.5;
                break;
            default:
                shape = new p2.Circle({
                    radius: 20
                });
                break;
        }
        shape.sensor = true;
        shape.collisionGroup = CollisionGroups.PROJECTILE;
        shape.collisionMask = bCollidePawns ? (CollisionGroups.GROUND | CollisionGroups.PAWN | CollisionGroups.VEHICLE | CollisionGroups.OBJECT) : (CollisionGroups.GROUND | CollisionGroups.OBJECT);
        body.addShape(shape);
        this.addWorldBody(body);

        var rad = _rotation;
        var speed = _data.velocity ? _data.velocity : 200;
        body.applyImpulse([Math.cos(rad) * speed, Math.sin(rad) * speed], 0, 0);

        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "projectile",
            position: body.position,
            rotation: body.angle,
            velocity: body.velocity,
            angularVelocity: body.angularVelocity,
            data: body.data
        });

        return body;
    }

    createEquipment(_position, _team, _scale, _ownerId, _weaponData)
    {
        var shared = this.getSharedData(_weaponData.id);
        var body = new p2.Body({
            mass: shared.mass ? shared.mass : 1,
            damping: shared.damping != null ? shared.damping : 0.5,
            angularDamping: shared.angularDamping != null ? shared.angularDamping : 0.8,
            position: _position,
            allowSleep: true,
            sleepSpeedLimit: 1,
            sleepTimeLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            x: _position[0],
            y: _position[1],
            type: "equipment",
            health: _weaponData["health"] ? _weaponData["health"] : 1,
            team: _team,
            scale: _scale,
            ownerId: _ownerId,
            weaponData: _weaponData
        };
        if (_weaponData.id == "trophy")
        {
            body.data["material"] = Material.METAL;
            body.data["blockNum"] = 5;
            body.data["bCanMelee"] = true;
        }
        else if (_weaponData.id == "beacon")
        {
            body.data["material"] = Material.METAL;
            body.fixedRotation = true;
        }
        if (_weaponData.radius)
        {
            body.data.radius = _weaponData.radius;
        }
        if (_weaponData.bMine)
        {
            body.data.bMine = true;
            switch (_weaponData.id)
            {
                case "claymore":
                    body.data.bUseScale = true;
                    body.data.triggerRange = 200;
                    break;

                case "betty":
                    body.data.triggerRange = 60;
                    body.data.triggerType = "tank";
                    break;

                default:
                    body.data.triggerRange = 100;
                    break;
            }
        }
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionGroup: CollisionGroups.PAWN,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE
        });
        body.addShape(shape);

        var numMax = 4;
        switch (_weaponData.id)
        {
            case "jammer":
            case "sensor":
            case "trophy":
                numMax = 2;
                break;
        }
        var arr = this.getEquipmentByPlayerId(_ownerId, _weaponData.id);
        if (arr.length >= numMax)
        {
            this.removeNextStep(arr[0]);
        }

        this.addWorldBody(body);
        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "equipment",
            position: body.position,
            data: body.data
        });
        return body;
    }

    getEquipmentByPlayerId(_id, _weaponId)
    {
        var arr = [];
        if (_id)
        {
            var equipment = this.getEquipment();
            for (var i = 0; i < equipment.length; i++)
            {
                var item = equipment[i];
                if (item.data.ownerId == _id)
                {
                    if (_weaponId != null)
                    {
                        if (item.data.weaponData.id == _weaponId)
                        {
                            arr.push(item);
                        }
                    }
                    else
                    {
                        arr.push(item);
                    }
                }
            }
        }
        return arr;
    }

    onStoppingPowerHit(_body)
    {
        var data = _body.data;  
        if (data.type == "character")
        {
            data.stoppingPowerTimer = Math.round(this.game.settings.fps * 0.25);
            this.setDataValue(_body, "bStoppingPower", true);
        }
    }

    startLadderClimb(_body, _ladder)
    {
        if (_body.data.controllableId)
        {
            return;
        }

        this.removeParachute(_body);
        this.cancelCharacterReload(_body);
        this.cancelCharacterBoltPull(_body);

        var shape = _body.shapes[0];
        shape.collisionMask = CollisionGroups.PROJECTILE;

        var shared = this.getSharedData(_body.data.type);

        _body.gravityScale = 0;
        _body.damping = shared.climbDamping;
        _body.velocity = [0, 0];
        _body.position[0] = _ladder.position[0];
        _body.fixedX = true;

        var data = _body.data;
        data.bClimbing = true;
        data.ladderId = _ladder.data.id;
        data.ladderDirection = _ladder.data.direction;

        this.requestEvent({
            eventId: GameServer.EVENT_PAWN_ACTION,
            pawnId: data.id,
            type: GameServer.PAWN_START_LADDER_CLIMB,
            position: _body.position,
            ladderDirection: data.ladderDirection
        });
    }

    leaveLadder(_body)
    {
        var shared = this.getSharedData(_body.data.type);

        _body.gravityScale = 1;
        _body.damping = shared.damping;
        _body.velocity = [0, 0];
        _body.fixedX = false;

        var shape = _body.shapes[0];
        shape.collisionMask = CollisionGroups.GROUND | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT;

        var data = _body.data;
        if (data["bClimbing"])
        {
            data["bLadderCooldown"] = 1;
            data["speedMultiplier"] = 1;
            data["ladderCooldownTimer"] = shared.ladderCooldown ? (shared.ladderCooldown * this.game.fpsMult) : 1;
        }
        data["bClimbing"] = false;
        delete data["ladderId"];
        delete data["ladderDirection"];

        if (data["bBot"])
        {
            _body.ai.ticker = 1;
        }

        this.requestEvent({
            eventId: GameServer.EVENT_PAWN_ACTION,
            pawnId: data.id,
            position: _body.position,
            velocity: _body.velocity,
            type: GameServer.PAWN_LEAVE_LADDER
        });
    }

    createVehicle(_position, _id)
    {
        var veh = this.getVehicleData(_id);
        if (veh)
        {
            var data = {
                type: veh.id,
                scale: 1,
                team: 0,
                weaponId: _id,
            }
            switch (veh.type)
            {
                case "droppedWeapon":
                    var pawn = this.createDroppedWeapon(_position, {
                        scale: data.scale,
                        weaponData: this.getWeaponData(data.weaponId)
                    });
                    pawn.data.bSpawned = true;
                    break;
                case "helicopter":
                    pawn = this.createHelicopter(_position, {
                        type: data.type,
                        team: data.team,
                        scale: data.scale
                    });
                    break;
                case "tank":
                    pawn = this.createTank(_position, {
                        type: data.type,
                        team: data.team,
                        scale: data.scale
                    });
                    break;
                case "car":
                    pawn = this.createCar(_position, {
                        type: data.type,
                        team: data.team,
                        scale: data.scale
                    });
                    break;
                case "mountedWeapon":
                    pawn = this.createMountedWeapon(_position, {
                        weaponType: data.weaponType,
                        team: data.team != null ? data.team : -1,
                        scale: data.scale
                    });
                    break;
            }
        }
    }

    spawn(_playerId, _id)
    {
        var curPawn = this.getObjectById(_playerId);
        if (curPawn)
        {
            this.createVehicle(curPawn.position, _id);
        }
    }

    ejectPawn(_id)
    {
        var curPawn = this.getObjectById(_id);
        if (curPawn)
        {
            var veh = this.getObjectById(curPawn.data.controllableId);
            if (veh)
            {
                veh.position[1] -= 500;
            }
        }
    }

    killPawn(_id)
    {
        var curPawn = this.getObjectById(_id);
        if (curPawn)
        {
            var damage = curPawn.data.health;
            if (curPawn.data.damageMultipliers)
            {
                curPawn.data.damageMultipliers[DamageType.DAMAGE_WORLD] = 1;
            }
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_DAMAGE,
                damageType: DamageType.DAMAGE_WORLD,
                damageAmount: Math.max(damage, 500),
                pawnId: _id,
                attackerId: _id,
                causerId: null,
                weaponId: "generic",
                bDirectlyCausedByPlayer: false
            });
        }
    }

    getClimbableLadder(_body)
    {
        var world = this.game.world;
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "ladder":
                        var bOverlap = _body.getAABB().overlaps(cur.getAABB());
                        if (bOverlap)
                        {
                            return cur;
                        }
                        break;
                }
            }
        }
        return null;
    }

    getLadders()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "ladder":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    removeEquipmentByPlayerId(_id, _weaponId)
    {
        if (_id)
        {
            var equipment = this.getEquipment();
            for (var i = 0; i < equipment.length; i++)
            {
                var item = equipment[i];
                if (item.data.ownerId == _id)
                {
                    if (_weaponId != null)
                    {
                        if (item.data.weaponData.id == _weaponId)
                        {
                            this.removeNextStep(item);
                        }
                    }
                    else
                    {
                        this.removeNextStep(item);
                    }
                }
            }
        }
    }

    removeGrenadesByPlayerId(_id, _weaponId)
    {
        if (_id)
        {
            var grenades = this.getGrenades();
            for (var i = 0; i < grenades.length; i++)
            {
                var item = grenades[i];
                if (item.data.grenadeData.playerId == _id)
                {
                    if (_weaponId != null)
                    {
                        if (item.data.weaponData.id == _weaponId)
                        {
                            this.removeNextStep(item);
                        }
                    }
                    else
                    {
                        this.removeNextStep(item);
                    }
                }
            }
        }
    }

    createSpawner(_position, _data)
    {
        var spawner = _data;
        spawner.position = _position;
        spawner.timer = 0;
        if (_data.timerMax == null)
        {
            _data.timerMax = this.game.settings.fps * 10;
        }
        this.game.spawners.push(spawner);
    }

    getNumSpawnsForTeam(_team)
    {
        var num = 0;
        var spawns = this.game.gameModeData.spawns;
        for (var i = 0; i < spawns.length; i++)
        {
            if (spawns[i].team == _team)
            {
                num++;
            }
        }
        return num;
    }

    handleSpawn(_spawn)
    {
        var prevTeam = _spawn.team;
        if (_spawn.val != null && _spawn.val != 0)
        {
            var desiredTeam = _spawn.val > 0 ? 0 : 1;
            _spawn.team = desiredTeam;
        }
        if (prevTeam != _spawn.team)
        {
            this.onEvent({
                eventId: GameServer.EVENT_GAME_UPDATE,
                data: {
                    spawns: this.game.gameModeData.spawns
                }
            });
        }
    }

    handleSpawner(_spawner)
    {
        var pawn = this.getObjectById(_spawner.pawnId);
        if (!pawn)
        {
            if (_spawner.timer > 0)
            {
                _spawner.timer--;
            }
            else
            {
                _spawner.timer = _spawner.timerMax;
                var data = _spawner.data;
                switch (_spawner.type)
                {
                    case "droppedWeapon":
                        pawn = this.createDroppedWeapon(_spawner.position, {
                            scale: data.scale,
                            weaponData: this.getWeaponData(data.weaponId)
                        });
                        pawn.data.bSpawned = true;
                        break;

                    case "helicopter":
                        pawn = this.createHelicopter(_spawner.position, {
                            type: data.type,
                            team: data.team,
                            scale: data.scale
                        });
                        break;

                    case "tank":
                        pawn = this.createTank(_spawner.position, {
                            type: data.type,
                            team: data.team,
                            scale: data.scale
                        });
                        break;

                    case "car":
                        pawn = this.createCar(_spawner.position, {
                            type: data.type,
                            team: data.team,
                            scale: data.scale
                        });
                        break;

                    case "mountedWeapon":
                        pawn = this.createMountedWeapon(_spawner.position, {
                            weaponType: data.weaponType,
                            team: data.team != null ? data.team : -1,
                            scale: data.scale
                        });
                        break;
                }
                if (pawn)
                {
                    _spawner.pawnId = pawn.data.id;
                }
            }
        }
    }

    createTank(_position, _data)
    {
        var body = new p2.Body({
            mass: 10,
            position: _position,
            gravityScale: 1,
            allowSleep: true,
            sleepSpeedLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            type: "tank",
            material: Material.METAL,
            damageMultipliers: {
                1: 0.1,
                2: 0,
                3: 2
            },
            team: _data.team != null ? _data.team : -1,
            scale: _data.scale != null ? _data.scale : 1,
            tankData: _data,
            vehicleId: _data.type,
            bRegenHealth: true,
            regenTimerMax: 180 * this.game.fpsMult,
            regenTimer: 0,
            regenThreshold: 0.25
        };
        var data = body.data;
        switch (_data.type)
        {            
            case Tank.ABRAMS:
                data.speed = 250;
                data.health = 3000;
                data.seats = [
                    {
                        position: [0, 0],
                        bBack: true,
                        bInvisible: true
                    },
                    {
                        position: [-40, -55],
                        bBack: true
                    }
                ];
                var mg = this.getWeaponData("m240");
                mg.overheatMax = 180;
                data.weapons = [
                    [
                        {
                            muzzlePos: [100, -30],
                            weaponData: this.getWeaponData("m256a1"),
                            minAngle: this.ToRad(-80),
                            maxAngle: this.ToRad(30)
                        },
                        {
                            muzzlePos: [-30, -70],
                            weaponData: this.getWeaponData("m249")
                        }
                    ],
                    [
                        {
                            muzzlePos: [-30, -70],
                            weaponData: mg
                        }
                    ]
                ];
                break;
            case Tank.T90:
                data.speed = 325;
                data.health = 2750;
                data.seats = [
                    {
                        position: [0, 0],
                        bBack: true,
                        bInvisible: true
                    },
                    {
                        position: [-20, -55],
                        bBack: true
                    }
                ];
                var mg = this.getWeaponData("m240");
                mg.overheatMax = 180;
                data.weapons = [
                    [
                        {
                            muzzlePos: [100, -30],
                            weaponData: this.getWeaponData("m256a1"),
                            minAngle: this.ToRad(-80),
                            maxAngle: this.ToRad(30)
                        }
                    ],
                    [
                        {
                            muzzlePos: [-10, -80],
                            weaponData: mg
                        }
                    ]
                ];
                break;
        }
        this.initVehicleWeapons(body, data.weapons);
        data.maxHealth = data.health;
        var shared = this.getSharedData(_data.type);
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionGroup: CollisionGroups.VEHICLE,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.VEHICLE | CollisionGroups.OBJECT
        });
        body.addShape(shape);
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "tank",
            position: body.position,
            data: body.data
        });
        return body;
    }

    setVehicleWeapon(_vehicle, _index, _weapon)
    {
        var weapon = this.getVehicleWeapon(_vehicle, _index);
        if (weapon)
        {
            weapon = _weapon;
            weapon.aimRotation = 0;
            weapon.overheat = 0;
            if (weapon.muzzlePos)
            {
                weapon.muzzlePos = [0, 0];
            }
        }
    }

    createCar(_position, _data)
    {
        var shared = this.getSharedData(_data.type);
        var body = new p2.Body({
            mass: shared.mass,
            position: _position,
            angularDamping: shared.angularDamping,
            gravityScale: 1,
            allowSleep: true,
            sleepSpeedLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            type: "car",
            material: Material.METAL,
            damageMultipliers: {
                1: 0.1,
                2: 0,
                3: 1.5
            },
            team: _data.team != null ? _data.team : -1,
            scale: _data.scale != null ? _data.scale : 1,
            carData: _data,
            vehicleId: _data.type
        };
        var data = body.data;
        switch (_data.type)
        {
            case Car.QUAD:
                data.health = 750;
                data.seats = [
                    {
                        position: [0, -20],
                    },
                    {
                        position: [-40, -20],
                        bInput: true
                    }
                ];
                break;
        }
        this.initVehicleWeapons(body, data.weapons);
        data.maxHealth = data.health;
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionGroup: CollisionGroups.VEHICLE,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE
        });
        body.addShape(shape);
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "car",
            position: body.position,
            data: body.data
        });
        return body;
    }

    detachRope(_body)
    {
        if (_body)
        {
            var data = _body.data;
            if (data.attachId)
            {
                this.game.world.removeConstraint(_body.constraint);
                delete _body.constraint;
                var attached = this.getObjectById(data.attachId);
                if (attached)
                {
                    var shared = this.getSharedData(attached.data.vehicleId);
                    if (shared && shared.mass)
                    {
                        attached.mass = shared.mass;
                    }
                    else
                    {
                        attached.mass = this.isVehicle(attached) ? 10 : 1;
                    }
                    if (attached.type == "helicopter" && this.vehicleHasOccupant(attached))
                    {
                        attached.gravityScale = 0;
                    }
                    else
                    {
                        attached.gravityScale = 1;
                    }
                    this.game.world.removeConstraint(attached.constraint);
                    delete attached.constraint;
                    this.setDataValue(attached, "attachToId", null);
                    attached.updateMassProperties();
                }
                this.setDataValue(_body, "attachId", null);
            }
        }
    }

    attachRope(_body, _target)
    {
        if (_target && _target.data.health)
        {
            _target.mass = Math.min(_target.mass, 1);
            _target.updateMassProperties();
            _target.data.attachToId = _body.data.id;
            
            var constraint = new p2.RevoluteConstraint(_body, _target, {
                worldPivot: [_body.position[0], _body.position[1]]
            });
            constraint.setRelaxation(0.5);
            constraint.setStiffness(100);
            //constraint.upperLimit = this.ToRad(75);
            //constraint.upperLimitEnabled = true;
            //constraint.lowerLimit = this.ToRad(-75);
            //constraint.lowerLimitEnabled = true;
            this.game.world.addConstraint(constraint);

            _target.constraint = constraint;
            _body.constraint = constraint;

            this.setDataValue(_target, "attachToId", _body.data.id);
            this.setDataValue(_body, "attachId", _target.data.id);
        }
    }

    createHelicopter(_position, _data)
    {
        var shared = this.getSharedData(_data.type);
        var body = new p2.Body({
            mass: shared.mass ? shared.mass : 10,
            position: _position,
            gravityScale: 1,
            angularDamping: 0.8,
            damping: 0.5,
            allowSleep: true,
            sleepSpeedLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            type: "helicopter",
            material: Material.METAL,
            damageMultipliers: {
                1: 0.1,
                2: 0,
                3: 2.5
            },
            sway: this.Random(0, 99),
            swayDir: this.RandomBoolean() ? 1 : -1,
            swayMax: 100,
            team: _data.team != null ? _data.team : -1,
            scale: _data.scale != null ? _data.scale : 1,
            heliData: _data,
            angleMult: 0.015,
            vehicleId: _data.type,
            bRegenHealth: true,
            regenTimerMax: 180 * this.game.fpsMult,
            regenTimer: 0,
            regenThreshold: 0.25
        };
        var data = body.data;
        switch (_data.type)
        {
            case Helicopter.MH6:
                data.health = 1000;
                data.seats = [
                    {
                        position: [70, 5],
                        bBack: true
                    },
                    {
                        position: [20, 12],
                        bInput: true
                    }
                ];
                data.weapons = [
                    {
                        muzzlePos: [80, 40],
                        aimRotation: 0,
                        overheat: 0
                    }
                ];
                break;

            case Helicopter.COBRA:
                data.health = 2000;
                data.speed = 2800;
                data.seats = [
                    {
                        position: [160, 20],
                        bBack: true
                    },
                    {
                        position: [110, 20],
                        bBack: true
                    }
                ];      
                data.weapons = [
                    [
                        {
                            muzzlePos: [30, 60],
                            weaponData: this.getWeaponData("zuni")
                        }
                    ],
                    [
                        {
                            muzzlePos: [170, 60],
                            weaponData: this.getWeaponData("gatling")
                        }
                    ]
                ];
                break;

            case Helicopter.OH58:
                data.health = 2000;
                data.speed = 3000;
                data.seats = [
                    {
                        position: [190, 30],
                        bBack: true
                    },
                    {
                        position: [110, 30],
                        bBack: true
                    },
                    {
                        position: [150, 45],
                        bInput: true
                    }
                ];
                data.weapons = [
                    [
                        {
                            muzzlePos: [225, 60],
                            weaponData: this.getWeaponData("minigun")
                        }
                    ],
                    [
                        {
                            muzzlePos: [0, 55],
                            weaponData: this.getWeaponData("minigun")
                        }
                    ]
                ];
                break;

            case Helicopter.BLACKHAWK:                
                data.health = 2500;
                data.speed = 3000;
                data.seats = [
                    {
                        position: [250, 60],
                        bBack: true
                    },
                    {
                        position: [140, 90],
                        bInput: true
                    },
                    {
                        position: [90, 90],
                        bInput: true
                    }
                ];
                break;

            case Helicopter.OSPREY:
                data.health = 3000;
                data.speed = 2250;
                data.seats = [
                    {
                        position: [350, 60],
                        bBack: true
                    },
                    {
                        position: [310, 60],
                        bBack: true
                    },
                    {
                        position: [180, 60],
                        bBack: true
                    },
                    {
                        position: [15, 60],
                        bBack: true
                    }
                ];
                data.weapons = [
                    [
                        {
                            muzzlePos: [0, 0],
                            weaponData: this.getWeaponData("rope")
                        }
                    ],
                    [
                        {
                            muzzlePos: [280, 125],
                            weaponData: this.getWeaponData("m242")
                        }
                    ],
                    [
                        {
                            muzzlePos: [180, 125],
                            weaponData: this.getWeaponData("minigun")
                        }
                    ],
                    [
                        {
                            muzzlePos: [0, 125],
                            aimRotation: 0,
                            weaponData: this.getWeaponData("minigun")
                        }
                    ]
                ];
                break;
        }
        this.initVehicleWeapons(body, data.weapons);
        data.maxHealth = data.health;       
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionGroup: CollisionGroups.VEHICLE,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT | CollisionGroups.VEHICLE
        });
        body.addShape(shape);
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "helicopter",
            position: body.position,
            data: body.data
        });
        return body;
    }

    initVehicleWeapons(_body, _weapons)
    {
        var data = _body.data;
        data.weaponIndex = 0;
        if (_weapons)
        {
            for (var i = 0; i < _weapons.length; i++)
            {
                var wpn = this.getVehicleWeapon(_body, i);
                if (wpn)
                {
                    wpn.overheat = 0;
                    wpn.aimRotation = 0;
                    if (wpn.weaponData)
                    {
                        if (wpn.weaponData.ammoMax)
                        {
                            wpn.ammo = wpn.weaponData.ammoMax;
                        }
                    }
                }
            }
        }
    }

    setPawnRequest(_body, _value)
    {
        this.setDataValue(_body, "currentRequest", _value);
        _body.data.requestTimer = this.game.settings.fps * 5;
    }

    createDoor(_data)
    {
        var body = new p2.Body({
            mass: 0,
            position: _data.position,
            allowSleep: true,
            fixedRotation: true,
            sleepSpeedLimit: 1,
            sleepTimeLimit: 1
        });
        if (!_data.height)
        {
            console.warn("Missing height");
        }
        var width = _data.width ? _data.width : 40;
        var height = _data.height;

        var useWidth = Math.max(50, width);
        var useHeight = Math.max(100, height);
        var material = _data.material ? _data.material : Material.WOOD;
        body.data = {
            id: _data.id ? _data.id : this.getRandomUniqueId(),
            type: "door",
            bClosed: _data.bClosed,
            material: material,
            width: width,
            height: height,
            useHeight: useHeight,
            cooldownTimer: 0,
            team: -1,
            doorType: _data.doorType,
            doorData: {
                doorType: _data.doorType,
                bClosed: _data.bClosed,
                width: useWidth,
                height: useHeight
            }
        };
        body.addShape(new p2.Box({
            width: useWidth,
            height: useHeight,
            collisionGroup: CollisionGroups.PAWN
        }));
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "door",
            position: body.position,
            data: body.data
        });
        this.setDoorClosed(body, body.data.bClosed);
    }

    setDoorClosed(_body, _bClosed, _causer, _bImpact, _bForce)
    {
        if (_body)
        {
            var data = _body.data;
            if (!_bForce && data["cooldownTimer"] > 0)
            {
                return;
            }
            var prev = data.bClosed;
            data.bClosed = _bClosed;
            var shape = _body.shapes[0];
            if (_bClosed)
            {
                shape.collisionGroup = CollisionGroups.GROUND;
                shape.collisionMask = CollisionGroups.PAWN | CollisionGroups.PROJECTILE | CollisionGroups.VEHICLE | CollisionGroups.OBJECT;
            }
            else
            {
                shape.collisionGroup = 0;
                shape.collisionMask = 0;
            }
            if (data.bClosed != prev)
            {
                var scale = null;
                if (_causer)
                {
                    data["cooldownTimer"] = Math.round(this.game.settings.fps * 0.5);
                    if (!_bClosed)
                    {
                        var causerPos = _causer.previousPosition ? _causer.previousPosition : _causer.position;
                        scale = _body.position[0] > causerPos[0] ? 1 : -1;
                    }
                }
                this.onEvent({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: data.id,
                    causerId: _causer ? _causer.data.id : null,
                    type: GameServer.PAWN_UPDATE_DOOR,
                    bClosed: data.bClosed,
                    scale: scale,
                    bImpact: _bImpact
                });
            }
        }
    }

    createMountedWeapon(_position, _data)
    {
        var body = new p2.Body({
            mass: 0,
            position: _position,
            angle: _data.rotation != null ? _data.rotation : 0,
            fixedRotation: true,
            allowSleep: true,
            sleepSpeedLimit: 1
        });
        body.data = {
            id: _data.id ? _data.id : this.getRandomUniqueId(),
            rotation: _data.rotation,
            type: "mountedWeapon",
            team: _data.team != null ? _data.team : -1,
            scale: _data.scale != null ? _data.scale : 1,
            mountedData: _data,
            damageMultipliers: {
                1: 0.1,
                2: 0,
                3: 1
            },
        };
        var data = body.data;        
        switch (_data.weaponType)
        {
            case MountedWeapon.M2_BROWNING:
                data.health = 500;
                data.weaponData = {
                    type: _data.weaponType
                };
                data.seats = [
                    {
                        position: [-20, -10],
                        bBack: true,
                        bTurret: true
                    }
                ];
                var mg = this.getWeaponData("m2");
                data.weapons = [
                    [
                        {
                            id: mg.id,
                            muzzlePos: [0, -20],
                            weaponData: mg,
                            minAngle: this.ToRad(-90),
                            maxAngle: this.ToRad(90)
                        }
                    ]
                ];
                break;
            case MountedWeapon.BGM71_TOW:
                data.health = 500;
                data.weaponData = {
                    type: _data.weaponType
                };
                data.seats = [
                    {
                        position: [-20, -10],
                        bBack: true,
                        bTurret: true
                    }
                ];
                var wpn = this.getWeaponData("bgm71");
                data.weapons = [
                    [
                        {
                            id: wpn.id,
                            muzzlePos: [0, -20],
                            weaponData: wpn,
                            minAngle: this.ToRad(-90),
                            maxAngle: this.ToRad(90)
                        }
                    ]
                ];
                break;
        }
        this.initVehicleWeapons(body, data.weapons);
        data.maxHealth = data.health;
        body.addShape(new p2.Box({
            width: 70,
            height: 24,
            collisionGroup: CollisionGroups.PAWN
        }));
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "mountedWeapon",
            position: body.position,
            rotation: body.angle,
            data: body.data
        });
        return body;
    }

    createWindow(_data)
    {
        var body = new p2.Body({
            mass: 0,
            position: _data.position,
            angle: _data.rotation != null ? _data.rotation : 0,
            allowSleep: true,
            sleepSpeedLimit: 1
        });
        body.data = {
            id: _data.id ? _data.id : this.getRandomUniqueId(),
            rotation: _data.rotation,
            type: _data.type,
            width: _data.width,
            height: _data.height,
            material: Material.GLASS,
            health: 1,
            bSkipServerUpdate: body.mass == 0
        };
        var data = body.data;
        data.maxHealth = data.health;
        data.team = -1;
        data.damageMultipliers = {
            1: 1,
            2: 0.1,
            3: 50
        };
        body.addShape(new p2.Box({
            width: _data.width,
            height: _data.height,
            collisionGroup: CollisionGroups.OBJECT,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PAWN | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT | CollisionGroups.VEHICLE
        }));
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "window",
            position: body.position,
            rotation: body.angle,
            data: body.data
        });
    }

    createFlag(_position, _data)
    {
        var body = new p2.Body({
            mass: 0,
            position: _position,
            fixedRotation: true
        });
        var captureTime = this.game.settings.fps * 10;
        body.data = {
            id: "flag_" + _data.num,
            x: body.position[0],
            y: body.position[1],
            type: "flag",
            num: _data.num,
            bIsBeingCaptured: false,
            bIsContested: false,
            captureTimer: [
                captureTime,
                captureTime
            ],
            captureTimerMax: captureTime,
            pointTimer: 0,
            pointTimerMax: this.game.settings.fps * 3
        };
        var shape = new p2.Box({
            width: 250,
            height: 121,
            collisionGroup: CollisionGroups.PAWN,
            collisionMask: CollisionGroups.GROUND
        });
        body.addShape(shape);
        this.addWorldBody(body);
        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "flag",
            position: body.position,
            data: body.data
        });
        return body;
    }

    createObstacle(_data)
    {
        var shared = this.getSharedData(_data.obstacleId);
        var body = new p2.Body({
            mass: shared.mass,
            damping: shared.damping,
            position: _data.position,
            angle: _data.rotation != null ? _data.rotation : 0,
            fixedRotation: shared.fixedRotation == true,
            allowSleep: true,
            sleepSpeedLimit: 1
        });            
        body.data = {
            id: _data.id ? _data.id : this.getRandomUniqueId(),
            obstacleId: _data.obstacleId,
            scale: _data.scale,
            rotation: _data.rotation,
            type: _data.type,
            width: shared.width,
            height: shared.height,
            bBlock: _data.bBlock,
            bSkipServerUpdate: shared.mass == 0
        };
        var data = body.data;
        switch (_data.obstacleId)
        {
            case "barrel_explosive":
                data.health = 100;
                data.material = Material.METAL;
                break;
            case "barrel_generic":
                data.health = 1;
                data.material = Material.METAL;
                data.bGodMode = true;
                break;
            case "sandbags":
                data.material = Material.SANDBAG;
                break;
            case "sandbags_large":
                data.material = Material.SANDBAG;
                break;
            case "sandbags_tall":
                data.material = Material.SANDBAG;
                break;
            case "sandbags_narrow":
                data.material = Material.SANDBAG;
                break;
            case "sandbags_edge":
                data.material = Material.SANDBAG;
                break;
            case "window":
                data.health = 1;
                data.material = Material.GLASS;
                break;
            default:
                data.material = Material.DEFAULT;
                break;
        }
        if (data.health > 0)
        {
            body.data.maxHealth = data.health;
            data.team = -1;
            data.damageMultipliers = {
                1: 1,
                2: 0.1,
                3: 50
            };
        }
        if (shared.mass > 0)
        {
            body.addShape(new p2.Box({
                width: shared.width,
                height: shared.height,
                collisionGroup: CollisionGroups.OBJECT,
                collisionMask: CollisionGroups.GROUND | CollisionGroups.PAWN | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT | CollisionGroups.VEHICLE
            }));
        }
        else
        {
            body.addShape(new p2.Box({
                width: shared.width,
                height: shared.height,
                collisionGroup: CollisionGroups.PAWN,
                collisionMask: CollisionGroups.PROJECTILE
            }));
        }        
        this.addWorldBody(body);
        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "obstacle",
            position: body.position,
            rotation: body.angle,
            data: body.data
        });
    }

    createLever(_position, _data)
    {
        var shared = this.getSharedData("lever");
        var body = new p2.Body({
            mass: shared.mass ? shared.mass : 0,
            position: _position,
            allowSleep: true,
            sleepSpeedLimit: 1,
            sleepTimeLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            type: "lever",
            itemData: _data.itemData,
            targetId: _data.targetId,
            links: _data.links,
            bEnabled: true
        };
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM
        });
        body.addShape(shape);
        this.addWorldBody(body);
        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "lever",
            position: body.position,
            data: body.data
        });
        return body;
    }

    startCharacterShieldCooldown(_body)
    {
        if (_body)
        {
            this.cancelCharacterBoltPull(_body);
            this.cancelCharacterReload(_body);
            var data = _body.data;
            data.bShieldCooldown = true;
            data.shieldCooldownTimer = Math.ceil(this.game.settings.fps * 0.5);
            data.bDoorCooldown = true;
            this.requestEvent({
                eventId: GameServer.EVENT_PAWN_ACTION,
                pawnId: data.id,
                type: GameServer.PAWN_START_SHIELD_COOLDOWN,
                bDoor: true,
                position: _body.position
            });
        }
    }

    createCrate(_position, _data)
    {
        var shared = this.getSharedData(_data.frame ? _data.frame : "crate");
        var body = new p2.Body({
            mass: _data.mass != null ? _data.mass : (shared.mass ? shared.mass : 1),
            position: _position,
            allowSleep: true,
            sleepSpeedLimit: 1,
            sleepTimeLimit: 1
        });
        body.data = {
            id: this.getRandomUniqueId(),
            type: "crate",
            itemData: _data.itemData,
            team: _data.team,
            crateType: _data.type,            
            bEnabled: true,
            bDisposable: _data.bDisposable != null ? _data.bDisposable : true
        };        
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM
        });
        body.addShape(shape);
        this.addWorldBody(body);
        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "crate",
            position: body.position,
            data: body.data
        });
        var crates = this.getDisposableCrates();
        if (crates.length > Settings.MAX_CRATES)
        {
            this.removeNextStep(crates[0]);
        }
        return body;
    }

    createGrenade(_position, _data)
    {
        var body = new p2.Body({
            mass: 1,
            position: _position,
            damping: 0.2,
            allowSleep: true,
            sleepSpeedLimit: 1,
            sleepTimeLimit: 1
        });
        var weaponData = _data.weaponData ? _data.weaponData : this.getWeaponData(_data.weaponId);
        var bRemoteDetonation = weaponData ? weaponData.bRemoteDetonation : false;
        body.data = {
            id: this.getRandomUniqueId(),
            type: "grenade",
            team: _data.team,
            damage: _data["damage"] ? _data["damage"] : weaponData["damage"],
            radius: _data["radius"] ? _data["radius"] : weaponData["radius"],
            bDetonationTimerEnabled: !_data["bStartDetonationAfterHit"],
            detonationTimer: (weaponData ? weaponData["detonationTimer"] : this.game.settings.fps) * this.game.fpsMult,
            bRemoteDetonation: bRemoteDetonation,
            grenadeData: _data
        };
        if (_data.bMinimumDistance)
        {
            body.data.minTimer = 10 * this.game.fpsMult;
        }
        var bCollidePawns = _data.bImpact || weaponData.bCollidePawns;
        var shared = this.getSharedData("grenade");
        if (bRemoteDetonation)
        {
            body.data.bDetonationTimerEnabled = false;
            body.allowSleep = false;
            body.data.health = 1;
            var shape = new p2.Box({
                width: shared.width,
                height: shared.height
            });
        }
        else
        {
            shape = new p2.Box({
                width: shared.width,
                height: shared.height
            });
        }
        if (_data.bImpact)
        {
            shape.sensor = true;
        }
        shape.collisionGroup = CollisionGroups.PROJECTILE;
        if (bCollidePawns)
        {
            shape.collisionMask = CollisionGroups.GROUND | CollisionGroups.PAWN | CollisionGroups.OBJECT | CollisionGroups.VEHICLE;
        }
        else if (bRemoteDetonation)
        {
            shape.collisionMask = CollisionGroups.GROUND | CollisionGroups.OBJECT | CollisionGroups.VEHICLE;
        }
        else
        {
            shape.collisionMask = CollisionGroups.GROUND | CollisionGroups.OBJECT;
        }
        body.addShape(shape);
        this.addWorldBody(body);

        shape.material = new p2.Material();
        var cm = new p2.ContactMaterial(
            shape.material,
            this.game.materials.ground,
            {
                friction: 100,
                restitution: bRemoteDetonation ? 0.1 : 0.25,
                stiffness: Number.MAX_VALUE
            }
        );
        this.game.world.addContactMaterial(cm);

        var rad = _data.rotation;
        var speed = _data.velocity;
        body.angularVelocity = (speed * 0.01);
        body.applyImpulse([Math.cos(rad) * speed, Math.sin(rad) * speed], 0, 0);

        this.requestEvent({
            eventId: GameServer.EVENT_SPAWN_OBJECT,
            type: "grenade",
            rotation: body.angle,
            position: body.position,
            velocity: body.velocity,
            angularVelocity: body.angularVelocity,
            data: body.data
        });

        return body;
    }

    getCharacterMaxHealth()
    {
        return this.game.gameModeData.bHardcore ? 100 : 200;
    }

    createCharacter(_data)
    {
        var shared = this.getSharedData("character");
        var body = new p2.Body({
            mass: 1,
            fixedRotation: shared.fixedRotation,
            damping: shared.damping,
            position: [_data.x, _data.y],
            allowSleep: false
        });
        var shape = new p2.Box({
            width: shared.width,
            height: shared.height,
            collisionGroup: CollisionGroups.PAWN,
            collisionMask: CollisionGroups.GROUND | CollisionGroups.PLATFORM | CollisionGroups.PROJECTILE | CollisionGroups.OBJECT
        });
        body.addShape(shape);
        body.data = {
            id: _data.id,
            type: "character",
            material: Material.FLESH,
            team: _data.team,
            health: _data.health ? _data.health : this.getCharacterMaxHealth(),
            aimRotation: 0,
            aimSpeed: 0.25 / this.game.fpsMult,
            desiredAimRotation: this.ToRad(this.RandomBoolean() ? 0 : 180),
            lookPos: [_data.x + this.RandomBoolean() ? 100 : -1000, _data.y],
            maxSpeed: shared.maxSpeed,
            jumpHeight: shared.jumpHeight,
            reloadMultiplier: 1,
            speedMultiplier: 1,
            baseSpeedMultiplier: 1,
            bRegenHealth: _data.bRegenHealth != null ? _data.bRegenHealth : true,
            regenTimerMax: 180 * this.game.fpsMult,
            regenTimer: 0,
            weapon: {
                fireDelayTimer: 0,
                burstTimer: 0,
                recoil: 0
            },
            bBot: _data.bBot,
            bExposed: false,
            avatar: _data.avatar
        };
        var data = body.data;
        data.maxHealth = data.health;
        //data.bGodMode = !data.bBot;
        data.weapon.bUnlimitedAmmo = this.game.gameModeData.bUnlimitedAmmo;
        if (_data.inventory)
        {
            var inventory = [];
            for (var i = 0; i < _data.inventory.length; i++)
            {
                var curItem = _data.inventory[i];
                if (curItem)
                {
                    var item = this.getWeaponData(curItem.id);
                    if (item)
                    {
                        if (curItem.mag != null)
                        {
                            item.mag = curItem.mag;
                        }
                        if (curItem.ammo != null)
                        {
                            item.ammo = curItem.ammo;
                        }
                        this.applyWeaponMods(item, curItem.mods);
                        inventory.push(item);
                    }
                    else
                    {
                        console.warn("Invalid item:", curItem.id);
                    }
                }
                else
                {
                    inventory.push(null);
                }
            }
            data.inventory = inventory;
            this.setCharacterCurrentInventoryItem(body, 0);
        }
        else
        {
            data.inventory = [];
        }
        if (_data.grenade)
        {
            data.grenade = this.getWeaponData(_data.grenade);
        }
        if (_data.equipment)
        {
            data.equipment = this.getWeaponData(_data.equipment);
        }
        if (_data.melee)
        {
            data.melee = this.getWeaponData(_data.melee);
        }
        this.addWorldBody(body);
        if (data.bBot)
        {
            this.initAI(body, _data.botSkill);
        }
        if (this.game.bSurvival && data.team == 0)
        {
            data.damageMultipliers = {
                1: 0.5,
                2: 0.5,
                3: 0.5,
                4: 0.5
            }
        }
        this.onEvent({
            eventId: GameServer.EVENT_SPAWN_CHARACTER,
            position: body.position,
            data: body.data
        });
        return body;
    }

    initAI(_body, _botSkill)
    {
        var ai = {
            pathTicker: 1,
            actionTicker: 0,
            actionTickerMax: 30,
            ticker: 0,
            botSkill: _botSkill,
            destThreshold: 30,
            fireBurstTimer: 0,
            fireBurstTimerMax: Math.round((this.Random(25, 30) + (_botSkill * 10)) * this.game.fpsMult),
            fireCooldownTimer: 0,
            fireCooldownTimerMax: Math.round((this.Random(90, 100) - (_botSkill * 15)) * this.game.fpsMult),
            semiCooldownTimer: 0,
            semiCooldownTimerMax: Math.round((this.Random(15, 20) - (_botSkill * 2)) * this.game.fpsMult),
            lookRange: 2500 + (_botSkill * 500),
            bFireCooldown: true,
        };
        if (this.game.bSurvival)
        {
            ai.bInteract = _body.data.team == 0;
        }
        else
        {
            ai.bInteract = true;
        }
        if (_botSkill == BotSkill.SKILL_EASY)
        {
            ai.fireBurstTimerMax = Math.ceil(ai.fireBurstTimerMax * 0.4);
            ai.fireCooldownTimerMax = Math.ceil(ai.fireCooldownTimerMax * 1.5);
        }
        else if (_botSkill == BotSkill.SKILL_NORMAL)
        {
            ai.fireBurstTimerMax = Math.ceil(ai.fireBurstTimerMax * 0.5);
            ai.fireCooldownTimerMax = Math.ceil(ai.fireCooldownTimerMax * 1.2);
        }
        else if (_botSkill == BotSkill.SKILL_INSANE)
        {
            ai.semiCooldownTimerMax -= Math.round(3 * this.game.fpsMult);
            ai.fireBurstTimerMax = Math.ceil(ai.fireBurstTimerMax * 1.5);
        }
        else if (_botSkill >= BotSkill.SKILL_GOD)
        {
            ai.semiCooldownTimerMax = 1;
            ai.fireBurstTimerMax = Math.ceil(ai.fireBurstTimerMax * 5);
        }
        _body.ai = ai;
    }

    raycast(_startX, _startY, _endX, _endY)
    {
        var arr = [];
        var ray = new p2.Ray({
            mode: p2.Ray.ALL,
            from: [_startX, _startY],
            to: [_endX, _endY],
            callback(result)
            {
                var hitPoint = p2.vec2.create();
                result.getHitPoint(hitPoint, ray);
                var bHeadshot = false;
                var bLegshot = false;
                if (result.body.data)
                {
                    switch (result.body.data.type)
                    {
                        case "character":
                            bHeadshot = hitPoint[1] < (result.body.position[1] - 22);
                            bLegshot = hitPoint[1] > (result.body.position[1] + 10);
                            break;
                    }
                }
                arr.push({
                    body: result.body,
                    point: { x: hitPoint[0], y: hitPoint[1] },
                    distance: result.getHitDistance(ray),
                    bHeadshot: bHeadshot,
                    bLegshot: bLegshot
                });
            }
        });
        var result = new p2.RaycastResult();
        this.game.world.raycast(result, ray);
        arr.sort(function (a, b)
        {
            if (a.distance < b.distance)
            {
                return -1;
            }
            else if (a.distance > b.distance)
            {
                return 1;
            }
            return 0;
        });
        return arr;
    }

    endMultiKill(_ps)
    {
        if (_ps)
        {
            var count = _ps.multiKillCount;
            if (count > 1)
            {
                this.requestEvent({
                    eventId: GameServer.EVENT_PLAYER_MULTI_KILL,
                    playerId: _ps.id,
                    kills: count
                });
            }
            _ps.multiKillTimer = 0;
            _ps.multiKillCount = 0;
        }
    }

    getInitEventData()
    {
        return {
            eventId: GameServer.EVENT_GAME_INIT,
            mapId: this.game.mapId,
            gameModeId: this.game.gameModeId,
            settings: this.game.settings
        }
    }

    getGameStartEventData()
    {
        return {
            eventId: GameServer.EVENT_GAME_START,
            timer: 0
        }
    }

    getGameModeEventData()
    {
        return {
            eventId: GameServer.EVENT_GAME_UPDATE,
            data: this.game.gameModeData
        };
    }

    getNumPlayers()
    {
        return this.game.players.length;
    }

    getPlayers()
    {
        return this.game.players;
    }

    getCurrentGameData()
    {
        return {
            timer: this.game.gameTimer,
            scores: this.game.gameModeData.scores
        };
    }

    getObjectsEventData()
    {
        var arr = [];
        for (var i = 0; i < this.game.world.bodies.length; i++)
        {
            var body = this.game.world.bodies[i];
            var data = body.data;
            if (data)
            {
                switch (data.type)
                {
                    case "character":                        
                        arr.push({
                            eventId: GameServer.EVENT_SPAWN_CHARACTER,
                            position: body.position,
                            data: data
                        });
                        break;
                    default:
                        arr.push({
                            eventId: GameServer.EVENT_SPAWN_OBJECT,
                            type: data.type,
                            position: body.position,
                            rotation: body.angle,
                            velocity: body.velocity,
                            angularVelocity: body.angularVelocity,
                            data: data
                        });
                        break;
                }
            }
        }
        var chars = this.getCharacters();
        for (var i = 0; i < chars.length; i++)
        {
            var char = chars[i];
            if (char.data.controllableId)
            {
                var veh = this.getObjectById(char.data.controllableId);
                arr.push({
                    eventId: GameServer.EVENT_PAWN_ACTION,
                    pawnId: char.data.id,
                    type: GameServer.PAWN_VEHICLE_ENTER,
                    vehicleId: veh.data.id,
                    scale: veh.data.scale,
                    seatIndex: char.data.seatIndex,
                    seat: veh.data.seats[char.data.seatIndex]
                });
            }
        }
        return arr;
    }

    onBeginContact(_event)
    {
        if (this.bDestroyed)
        {
            return;
        }
        this.onHit(_event.bodyA, _event.bodyB);
        this.onHit(_event.bodyB, _event.bodyA);
    }

    onHit(_bodyA, _bodyB)
    {
        var dataA = _bodyA.data;
        var dataB = _bodyB.data;
        if (dataB && dataB.bInvisible)
        {
            return;
        }
        if (dataA)
        {
            if (dataA.bPendingRemoval)
            {
                return;
            }
            switch (dataA.type)
            {
                case "obstacle":
                    switch (dataA.obstacleId)
                    {
                        case "barrel_generic":
                        case "barrel_explosive":
                            this.onEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: dataA.id,
                                type: GameServer.PAWN_HIT
                            });
                            break;
                    }
                    break;

                case "window":
                    if (this.isVehicle(_bodyB))
                    {
                        this.removeNextStep(_bodyA);
                    }
                    else
                    {
                        switch (dataB.type)
                        {
                            case "grenade":
                                this.removeNextStep(_bodyA);
                                break;
                        }
                    }
                    break;

                case "door":
                    if (dataA.bClosed && dataA.material != Material.METAL)
                    {
                        if (dataB.type == "character")
                        {
                            if (dataB.bBot || dataB.bSprinting)
                            {
                                this.setDoorClosed(_bodyA, false, _bodyB, true, dataB.bBot);
                            }
                        }
                        else if (this.isVehicle(_bodyB))
                        {
                            var vel = Math.abs(_bodyB.velocity[0]);
                            if (vel > 50)
                            {
                                this.setDoorClosed(_bodyA, false, _bodyB, true, dataB.bBot);
                            }
                        }
                    }
                    break;

                case "equipment":
                    switch (dataA.weaponData.id)
                    {
                        case "ammo_box":
                        case "beacon":
                            this.onEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: dataA.id,
                                type: GameServer.PAWN_HIT
                            });
                            break;
                    }
                    break;

                case "projectile":
                    if (!dataA["bHit"])
                    {
                        var bHit = true;  
                        if (!dataA.bHitSameTeam)
                        {
                            bHit = dataA.team != dataB.team;
                        }
                        if (dataA.projectileData.playerId == dataB.id || dataA.sourceId == dataB.id)
                        {
                            bHit = false;
                        }
                        switch (dataB.type)
                        {
                            case "shield":
                                if (dataA.projectileData.playerId == dataB.playerId)
                                {
                                    bHit = false;
                                }
                                break;
                            case "window":
                                this.removeNextStep(_bodyB);
                                break;
                        }
                        if (bHit)
                        {
                            var ps = this.getPlayerById(dataB["id"]);
                            var bSpawnProtected = ps && ps.bSpawnProtection;
                            if (bSpawnProtected)
                            {
                                bHit = false;
                            }
                        }
                        if (bHit)
                        {
                            if (dataA.projectileData.weaponId == "rope" && _bodyB.mass > 0 && !dataB.controllableId)
                            {
                                switch (dataB.type)
                                {
                                    case "helicopter":
                                    case "tank":
                                    case "car":
                                    case "obstacle":
                                        var source = this.getObjectById(dataA.sourceId);
                                        if (source)
                                        {
                                            this.attachRope(source, _bodyB);
                                        }
                                        break;
                                    default:
                                        if (dataB.health)
                                        {
                                            bHit = false;
                                        }
                                        break;
                                }
                            }
                        }
                        if (bHit)
                        {
                            dataA.bHit = true;

                            if (dataB["type"] == "character")
                            {
                                var impactType = dataB["material"] ? dataB["material"] : "default";
                                this.createImpactEffect(_bodyA.position[0], _bodyA.position[1], _bodyA.angle, impactType, 1);
                            }
                            if (dataA.team != dataB.team)
                            {
                                var damageType = DamageType.DAMAGE_MELEE;
                                if (dataB["health"])
                                {
                                    var projDamage = dataA["damage"];
                                    switch (dataA.projectileData["weaponId"])
                                    {
                                        case "knife":
                                            if (dataB["type"] == "character")
                                            {
                                                if (_bodyA.position[1] > _bodyB.position[1] + 10)
                                                {
                                                    projDamage *= 0.5;
                                                }
                                            }
                                            break;
                                        case "crossbow":
                                            if (dataB.bZombie)
                                            {
                                                projDamage *= 2;
                                            }
                                            if (dataB["type"] == "character")
                                            {
                                                if (_bodyA.position[1] < _bodyB.position[1] - 20)
                                                {
                                                    var bHeadshot = true;
                                                    projDamage *= 2;
                                                }
                                                else if (_bodyA.position[1] > _bodyB.position[1] + 10)
                                                {
                                                    projDamage *= this.game.bSurvival ? 0.5 : 0.25;
                                                }
                                            }
                                            else if (dataB["type"] == "infestor")
                                            {
                                                if (_bodyA.position[1] > _bodyB.position[1])
                                                {
                                                    bHeadshot = true;
                                                    projDamage *= 2;
                                                }
                                            }
                                            break;
                                    }
                                    if (projDamage > 0)
                                    {
                                        this.requestEvent({
                                            eventId: GameServer.EVENT_PAWN_DAMAGE,
                                            damageType: damageType,
                                            damageAmount: projDamage,
                                            pawnId: dataB["id"],
                                            attackerId: dataA.projectileData.playerId,
                                            causerId: dataA["id"],
                                            weaponId: dataA.projectileData["weaponId"],
                                            bMelee: dataA.projectileData["weaponId"] == "knife" || dataA.projectileData["weaponId"] == "crossbow",
                                            bKnife: dataA.projectileData["weaponId"] == "knife",
                                            bHeadshot: bHeadshot,
                                            bDirectlyCausedByPlayer: true
                                        });
                                    }
                                }
                            }
                            var pos = _bodyA.previousPosition ? _bodyA.previousPosition : _bodyA.position;
                            switch (dataA.projectileData["weaponId"])
                            {
                                case "knife":
                                    this.createDroppedWeapon(pos, {
                                        rotation: _bodyA.rotation,
                                        scale: 1,
                                        weaponData: this.getWeaponData(dataA.projectileData["weaponId"]),
                                        playerId: dataA.projectileData.playerId,
                                        velocity: [_bodyA.velocity[0] * 0.1, _bodyA.velocity[1]]
                                    });
                                    break;

                                case "crossbow":
                                    this.createImpactEffect(pos[0], pos[1], _bodyA.rotation, "default", 1);
                                    break;
                            }
                            this.removeNextStep(_bodyA);
                        }
                    }
                    break;

                case "character":
                    switch (dataB.type)
                    {
                        case "car":
                        case "tank":
                            if (dataA.team != dataB.team)
                            {
                                var vel = _bodyB.velocity[0] * _bodyB.velocity[0] + _bodyB.velocity[1] * _bodyB.velocity[1];
                                var damage = vel * 0.0005;
                                if (damage > 50)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PAWN_DAMAGE,
                                        damageType: DamageType.DAMAGE_WORLD,
                                        damageAmount: damage,
                                        pawnId: dataA.id,
                                        attackerId: this.getVehicleDriverId(_bodyB),
                                        causerId: dataB.id,
                                        weaponId: dataB.vehicleId,
                                        bDirectlyCausedByPlayer: false
                                    });
                                }
                            }
                            break;
                        case "ground":
                        case "platform":
                            this.removeParachute(_bodyA);
                            if (!dataA.controllableId && !dataA.bClimbing && !dataA.bLadderCooldown)
                            {
                                this.setDataValue(_bodyA, "currentSurface", dataB.material ? dataB.material : Material.DEFAULT);
                                if (this.game.gameModeData.bFallDamage && dataA.bBot)
                                {
                                    if (_bodyA.velocity)
                                    {
                                        var velY = _bodyA.velocity[1];
                                        if (velY > 500)
                                        {
                                            //Fall damage
                                            this.requestEvent({
                                                eventId: GameServer.EVENT_PAWN_DAMAGE,
                                                damageType: DamageType.DAMAGE_WORLD,
                                                damageAmount: Math.max(10, velY * 0.2),
                                                pawnId: dataA.id,
                                                attackerId: dataA.id,
                                                causerId: dataB.id,
                                                weaponId: "fall",
                                                bDirectlyCausedByPlayer: false
                                            });
                                        }
                                    }
                                }
                            }
                            break;
                    }
                    break;

                case "droppedWeapon":
                case "crate":
                case "tank":
                    this.onEvent({
                        eventId: GameServer.EVENT_PAWN_ACTION,
                        pawnId: dataA.id,
                        type: GameServer.PAWN_HIT
                    });
                    break;

                case "car":
                    if (dataB.type == "ground" || dataB.type == "platform")
                    {
                        this.setDataValue(_bodyA, "currentSurface", dataB.material ? dataB.material : Material.DEFAULT);
                    }
                    this.onEvent({
                        eventId: GameServer.EVENT_PAWN_ACTION,
                        pawnId: dataA.id,
                        type: GameServer.PAWN_HIT
                    });
                    break;

                case "helicopter":
                    switch (dataB.type)
                    {
                        case "ground":
                        case "platform":
                        case "helicopter":
                        case "tank":
                            this.onEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: dataA.id,
                                type: GameServer.PAWN_HIT
                            });
                            break;
                    }
                    if (dataB.type == "ground" || dataB.type == "platform")
                    {
                        if (!dataA["health"])
                        {
                            this.createExplosion({
                                eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                                x: _bodyA.position[0],
                                y: _bodyA.position[1],
                                radius: 500,
                                damage: Settings.VEHICLE_EXPLOSION_DAMAGE,
                                playerId: null,
                                causerId: null,
                                weaponId: null
                            });
                            this.removeNextStep(_bodyA);
                        }
                        else if (this.matchInProgress())
                        {                            
                            var deg = Math.abs(this.ToDeg(_bodyA.angle));
                            if (deg)
                            {
                                var vx = _bodyA.velocity[0];
                                var vy = _bodyA.velocity[1];
                                var damage = ((vx * vx + vy * vy) * 0.0005) * (deg * 0.05);
                                if (damage > _bodyA.data.maxHealth * 0.5)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PAWN_DAMAGE,
                                        damageType: DamageType.DAMAGE_WORLD,
                                        damageAmount: damage,
                                        pawnId: dataA.id,
                                        attackerId: null,
                                        causerId: dataA.id,
                                        weaponId: "generic"
                                    });
                                }
                            }
                        }
                    }
                    break;

                case "grenade":
                    if (dataA.grenadeData.bImpact)
                    {
                        if (this.isVehicle(_bodyB))
                        {
                            if (!this.vehicleHasOccupant(_bodyB))
                            {
                                break;
                            }                            
                        }
                        if (dataA.team == dataB.team)
                        {
                            break;
                        }
                        if (dataB)
                        {
                            var bDud = dataA["minTimer"] > 0 && !dataA["bDud"];
                            switch (dataB["type"])
                            {
                                case "helicopter":
                                case "tank":
                                case "car":
                                    var bDamage = true;
                                    var bDetonate = true;
                                    var attacker = this.getPlayerById(dataA.grenadeData.playerId);
                                    if (attacker)
                                    {
                                        if (attacker.team == dataB.team)
                                        {
                                            bDamage = false;
                                            bDetonate = false;
                                        }
                                    }
                                    else if (dataA.team == dataB.team)
                                    {
                                        bDamage = false;
                                        bDetonate = false;
                                    }
                                    if (bDamage)
                                    {
                                        var useDamage = dataA["damage"];
                                        if (this.game["bModeGame"])
                                        {
                                            useDamage *= 0.75;
                                        }
                                        this.requestEvent({
                                            eventId: GameServer.EVENT_PAWN_DAMAGE,
                                            damageType: DamageType.DAMAGE_EXPLOSIVE,
                                            damageAmount: useDamage,
                                            pawnId: dataB.id,
                                            attackerId: dataA.grenadeData.playerId,
                                            causerId: dataA.id,
                                            weaponId: dataA.grenadeData["weaponId"]
                                        });
                                    }
                                    if (bDetonate)
                                    {
                                        this.detonate(_bodyA, dataB.id);
                                    }
                                    break;

                                case "character":
                                    var bDetonate = true;
                                    var attacker = this.getPlayerById(dataA.grenadeData.playerId);
                                    if (attacker)
                                    {
                                        if (attacker.id == dataB.id)
                                        {
                                            bDetonate = false;
                                        }
                                    }
                                    else
                                    {
                                        if (dataA.grenadeData.playerId == dataB.id)
                                        {
                                            bDetonate = false;
                                        }
                                    }
                                    if (bDetonate)
                                    {
                                        if (dataA.grenadeData.team == dataB.team)
                                        {
                                            bDetonate = !this.game.bSurvival;
                                        }
                                    }
                                    if (bDetonate)
                                    {
                                        if (bDud)
                                        {
                                            var ps = this.getPlayerById(dataB.id);
                                            var bSpawnProtected = ps && ps.bSpawnProtection;
                                            if (!bSpawnProtected && dataA.grenadeData.team != dataB.team)
                                            {
                                                this.requestEvent({
                                                    eventId: GameServer.EVENT_PAWN_DAMAGE,
                                                    damageType: DamageType.DAMAGE_MELEE,
                                                    damageAmount: 200, //Direct impact
                                                    pawnId: dataB.id,
                                                    attackerId: dataA.grenadeData.playerId,
                                                    causerId: dataA.id,
                                                    weaponId: dataA.grenadeData["weaponId"], //"impact"
                                                    bDirectImpact: true
                                                });
                                                dataA["bDud"] = true;
                                            }
                                            else
                                            {
                                                this.createImpactEffect(_bodyA.position[0], _bodyA.position[1], _bodyA.angle, "grenade", 1);
                                            }
                                            this.removeNextStep(_bodyA);
                                        }
                                        else
                                        {
                                            this.detonate(_bodyA);
                                        }
                                    }
                                    break;

                                case "turret":
                                    var bDetonate = true;
                                    if (this.game.bSurvival)
                                    {
                                        bDetonate = false;
                                    }
                                    else if (dataA.team == dataB.team)
                                    {
                                        bDetonate = false;
                                    }
                                    if (bDetonate)
                                    {
                                        this.detonate(_bodyA);
                                    }
                                    break;

                                case "obstacle":
                                    if (this.game.bSurvival)
                                    {
                                        if (dataA.grenadeData.team == 0)
                                        {
                                            //Ignore
                                        }
                                    }
                                    else
                                    {
                                        this.detonate(_bodyA);
                                    }
                                    break;

                                case "door":
                                    this.detonate(_bodyA);
                                    if (dataB.material != Material.METAL)
                                    {
                                        this.setDoorClosed(_bodyB, false, _bodyA, true);
                                    }
                                    break;

                                default:
                                    this.detonate(_bodyA);
                                    break;
                            }
                        }
                    }
                    else
                    {
                        if (dataA.grenadeData["bStartDetonationAfterHit"])
                        {
                            dataA["bDetonationTimerEnabled"] = true;
                        }
                        var weaponData = this.getWeaponData(dataA.grenadeData["weaponId"]);
                        if (weaponData["bSticky"])
                        {
                            if (!_bodyA["constraint"])
                            {
                                _bodyA.velocity = [0, 0];
                                _bodyA.gravityScale = 0;
                                _bodyA.mass = 0.1;
                                _bodyA.angularVelocity = 0;
                                _bodyA.angularDamping = 0.99;
                                _bodyA.shapes[0].collisionMask = CollisionGroups.PROJECTILE;                                
                                var constraint = new p2.RevoluteConstraint(_bodyA, _bodyB, {
                                    worldPivot: [_bodyA.position[0], _bodyA.position[1]]
                                });
                                this.game.world.addConstraint(constraint);
                                _bodyA["constraint"] = constraint;
                                dataA["stuckToId"] = _bodyB.data.id;
                                this.setDataValue(_bodyA, "bStuck", true);
                            }
                        }
                    }
                    break;

                case "rocket":
                    if (dataB)
                    {
                        switch (dataB["type"])
                        {
                            case "helicopter":
                            case "tank":
                            case "car":
                                var bDamage = true;
                                var bDetonate = true;
                                var attacker = this.getPlayerById(dataA.rocketData.playerId);
                                var playerId = dataB.playerId; // == "helicopter" ? dataB.heliData.playerId : dataB.tankData.playerId;
                                if (attacker)
                                {
                                    if (dataA.rocketData.causerId == dataB.id)
                                    {
                                        bDamage = false;
                                    }
                                    else if (attacker.id == playerId)
                                    {
                                        bDamage = this.game.bFriendlyFire;
                                    }
                                    else if (attacker.team == dataB.team)
                                    {
                                        bDamage = false; //this.game["bFriendlyFire"];
                                    }
                                }
                                else
                                {
                                    if (dataA.rocketData.team == dataB.team)
                                    {
                                        bDamage = false;
                                    }
                                }
                                if (!this.vehicleHasOccupant(_bodyB) || !dataB.health)
                                {
                                    bDamage = false;
                                }
                                bDetonate = bDamage;
                                if (bDamage)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PAWN_DAMAGE,
                                        damageType: DamageType.DAMAGE_EXPLOSIVE,
                                        damageAmount: dataA["damage"],
                                        pawnId: dataB.id,
                                        attackerId: dataA.rocketData.playerId,
                                        causerId: dataA.id,
                                        weaponId: dataA.rocketData["weaponId"]
                                    });
                                }
                                if (bDetonate)
                                {
                                    this.detonate(_bodyA, dataB.id);
                                }
                                break;

                            case "character":
                                var bDetonate = true;
                                var attackerPawn = this.getObjectById(dataA.rocketData.playerId);
                                if (attackerPawn)
                                {
                                    if (attackerPawn.data.id == dataB.id)
                                    {
                                        bDetonate = false;
                                    }
                                    else if (dataA.rocketData.team == dataB.team)
                                    {
                                        bDetonate = !attackerPawn.data.bBot && this.game.gameModeData.bHardcore;
                                    }
                                }
                                if (dataB.controllableId)
                                {
                                    bDetonate = false;
                                }
                                if (bDetonate)
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PAWN_DAMAGE,
                                        damageType: DamageType.DAMAGE_EXPLOSIVE,
                                        damageAmount: dataA["damage"],
                                        pawnId: dataB.id,
                                        attackerId: dataA.rocketData.playerId,
                                        causerId: dataA.id,
                                        weaponId: dataA.rocketData["weaponId"]
                                    });
                                    this.detonate(_bodyA);
                                }
                                break;

                            case "obstacle":
                            case "destructableObject":
                                if (!dataA.rocketData.bAirOnly && !this.game.bSurvival)
                                {
                                    this.detonate(_bodyA);
                                }
                                break;

                            case "turret":
                                var bDetonate = true;
                                if (this.game.bSurvival || this.game["bSandbox"])
                                {
                                    bDetonate = dataA.rocketData.team != 0;
                                }
                                else if (dataA.team == dataB.team)
                                {
                                    bDetonate = false;
                                }
                                if (bDetonate)
                                {
                                    this.detonate(_bodyA);
                                }
                                break;

                            case "equipment":
                                //Ignore
                                break;

                            case "door":
                                this.detonate(_bodyA);
                                this.setDoorClosed(_bodyB, false, _bodyA, true);
                                break;

                            default:
                                this.detonate(_bodyA);
                                break;
                        }
                    }
                    break;
            }
        }
    }

    createExplosion(_data)
    {
        this.requestEvent(_data);
    }

    getExplosionObjects()
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.mass > 0 && cur.data)
            {
                switch (cur.data.type)
                {
                    case "character":
                    case "turret":
                    case "helicopter":
                    case "tank":
                    case "car":
                    case "mountedWeapon":
                    case "crate":
                    case "equipment":
                    case "droppedWeapon":
                    case "grenade":
                    case "obstacle":
                    case "window":
                        arr.push(cur);
                        break;
                }
            }
        }
        return arr;
    }

    checkExplosion(_x, _y, _radius, _damage, _instigatorId, _causerId, _weaponId, _bIgnoreLOS = false, _directHitId = null)
    {
        var instigator = this.getPlayerById(_instigatorId);
        var causer = this.getObjectById(_causerId);
        var damageAmount = _damage;
        var bLOS = !_bIgnoreLOS;

        var causerTeam = instigator ? instigator.team : null;
        if (!causerTeam)
        {
            causerTeam = causer ? causer.team : null;
        }

        var objects = this.getExplosionObjects();
        for (var i = 0; i < objects.length; i++)
        {
            var cur = objects[i];
            if (cur.data.bPendingRemoval)
            {
                damageAmount = 0;
                continue;
            }
            if (cur.data.bInvisible)
            {
                continue;
            }
            if (cur.data.type == "character")
            {
                if (cur.data.controllableId)
                {
                    var vehicle = this.getObjectById(cur.data.controllableId);
                    if (vehicle.data.type != "mountedWeapon")
                    {
                        continue;
                    }
                }
                var ps = this.getPlayerById(cur.data.id);
                if (ps && ps.bSpawnProtection)
                {
                    continue;
                }
            }
            else if (cur.data["type"] == "door")
            {
                if (!cur.data["bClosed"])
                {
                    continue;
                }
            }
            else if (cur.data["type"] == "destructableObject")
            {
                if (cur.data.destructableData["type"] == "deployable_cover")
                {
                    if (this.game.bSurvival && causerTeam == cur.data.team)
                    {
                        continue;
                    }
                }
            }

            var distMult = 1;
            var distFromCenter = this.Dist(_x, _y, cur.position[0], cur.position[1]);
            if (distFromCenter <= _radius)
            {
                var bLOSCheck = bLOS ? this.checkLineOfSight([_x, _y], cur.position) : true;
                if (bLOSCheck && cur.mass > 0 && (this.isVehicle(cur) || cur.data.type == "obstacle" || cur.data.type == "droppedWeapon" || cur.data.type == "crate"))
                {
                    var angle = this.Angle(_x, _y, cur.position[0], cur.position[1]);
                    cur.applyImpulse([Math.cos(angle) * _damage, Math.sin(angle) * _damage]);
                    cur.angularVelocity = angle;
                }
                if (cur.data.health > 0)
                {
                    if (cur.data.type == "door" && cur.data.bClosed && cur.data.material != Material.METAL)
                    {
                        this.setDoorClosed(cur, false, causer);
                    }
                    if (!bLOSCheck)
                    {
                        continue;
                    }
                    var bAlly = false;
                    var bSelf = false;
                    if (instigator)
                    {
                        bSelf = cur.data.id == instigator.id;
                        bAlly = cur.data.team == instigator.team && !bSelf;
                    }
                    else if (causer)
                    {
                        bSelf = cur.data.id == causer.id;
                        bAlly = cur.data.team == causer.team && !bSelf;
                    }
                    if (this.isVehicle(cur))
                    {
                        bAlly = false;
                    }
                    if (!this.game["bFriendlyFire"])
                    {
                        bAlly = bAlly || bSelf;
                    }
                    if (_weaponId == "bomb")
                    {
                        bAlly = false; //Bomb crates kill everyone
                    }
                    if (cur.data["type"] == "character" && bAlly)
                    {
                        damageAmount = 0;
                    }
                    else if (cur.data["type"] == "turret" && bAlly)
                    {
                        damageAmount = 0; //TODO: Can destroy own turrets
                    }
                    else if (this.isVehicle(cur) && this.vehicleHasOccupant(cur) && bAlly)
                    {
                        //damageAmount = 0;
                    }
                    else if (this.isVehicle(cur))
                    {
                        //Handle vehicle explosive damage
                        if (bAlly)
                        {
                            //damageAmount = 0;
                        }
                        else if (cur.data.id == _directHitId)
                        {
                            damageAmount = 0; //Direct hit, so don't apply additional explosive damage
                        }
                        else
                        {
                            distMult = (1 - distFromCenter / _radius);
                            damageAmount = _damage * distMult;
                            if (cur.data["bDrone"])
                            {
                                if (_weaponId == "stun")
                                {
                                    cur.data["bStunned"] = true;
                                    var maxStunTime = Math.round(this.game.settings.fps * 6);
                                    cur.data["stunTimer"] = Math.ceil(maxStunTime * distMult);
                                    this.onEvent({
                                        eventId: GameServer.EVENT_PAWN_ACTION,
                                        pawnId: cur.data.id,
                                        type: GameServer.PAWN_STUN,
                                        bValue: true,
                                        time: cur.data["stunTimer"]
                                    });
                                }
                                else if (_weaponId == "flashbang" || _weaponId == Mods.GRENADE_FLASH)
                                {
                                    cur.data["bFlashed"] = true;
                                    var maxFlashTime = Math.round(this.game.settings.fps * 6);
                                    cur.data["flashTimer"] = Math.ceil(maxFlashTime * distMult);
                                    this.onEvent({
                                        eventId: GameServer.EVENT_PAWN_ACTION,
                                        pawnId: cur.data.id,
                                        type: GameServer.PAWN_FLASH,
                                        bValue: true,
                                        flashIntensity: 1,
                                        time: cur.data["flashTimer"]
                                    });
                                }
                            }
                        }
                    }
                    else
                    {
                        distMult = 1 - distFromCenter / _radius;
                        damageAmount = _damage * distMult;
                        /*
                        if (distFromCenter > _radius * 0.8)
                        {
                            damageAmount *= 0.2;
                        }
                        if (distFromCenter > _radius * 0.5)
                        {
                            damageAmount *= 0.5;
                        }
                        else if (distFromCenter > _radius * 0.2)
                        {
                            damageAmount *= 0.8;
                        }
                        */
                        var flashMult = 1;
                        if (_weaponId == "stun" || _weaponId == "m203")
                        {
                            cur.data["bStunned"] = true;
                            var maxStunTime = Math.round(this.game.settings.fps * 6);
                            switch (cur.data["type"])
                            {
                                case "turret":
                                    cur.data["stunTimer"] = maxStunTime;
                                    break;

                                default:
                                    cur.data["stunTimer"] = Math.max(this.game.settings.fps * 2, Math.ceil((maxStunTime * distMult) * flashMult));
                                    break;
                            }

                            cur.data["aimRotation"] += this.ToRad(this.Random(-30, 30));

                            //TODO: Handle stuns/flashes in EVENT_PAWN_DAMAGE
                            this.onEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: cur.data.id,
                                type: GameServer.PAWN_STUN,
                                bValue: true,
                                time: cur.data["stunTimer"]
                            });
                        }
                        else if (_weaponId == "flashbang" || _weaponId == Mods.GRENADE_FLASH)
                        {
                            cur.data["bFlashed"] = true;
                            cur.data["flashIntensity"] = Math.min(1, distMult * 2);
                            var maxFlashTime = Math.round(this.game.settings.fps * 6);
                            switch (cur.data["type"])
                            {
                                case "turret":
                                    cur.data["flashTimer"] = maxFlashTime;
                                    break;

                                default:
                                    if (this.game["bOperation"] && cur.data.team == 1)
                                    {
                                        cur.data["flashTimer"] = maxFlashTime;
                                    }
                                    else if (cur.data["bZombie"])
                                    {
                                        cur.data["flashTimer"] = maxFlashTime;
                                    }
                                    else
                                    {
                                        cur.data["flashTimer"] = Math.ceil((maxFlashTime * distMult) * flashMult);
                                    }
                                    break;
                            }

                            this.onEvent({
                                eventId: GameServer.EVENT_PAWN_ACTION,
                                pawnId: cur.data.id,
                                type: GameServer.PAWN_FLASH,
                                bValue: true,
                                flashIntensity: cur.data["flashIntensity"],
                                time: cur.data["flashTimer"]
                            });
                        }
                    }
                }
                else
                {
                    damageAmount = 0;
                }

                if (damageAmount > 0)
                {
                    switch (cur.data.type)
                    {
                        case "equipment":
                            if (cur.data.id != _causerId)
                            {
                                if (cur.data.weaponData["bMine"])
                                {
                                    if (instigator)
                                    {
                                        cur.data["ownerId"] = instigator.id;
                                    }
                                    cur.data["bTriggered"] = true;
                                    cur.data["triggerTimer"] = 2;
                                }
                                else
                                {
                                    this.requestEvent({
                                        eventId: GameServer.EVENT_PAWN_DAMAGE,
                                        damageType: DamageType.DAMAGE_EXPLOSIVE,
                                        damageAmount: damageAmount,
                                        pawnId: cur.data.id,
                                        attackerId: instigator ? instigator.id : _causerId,
                                        causerId: _causerId,
                                        weaponId: _weaponId,
                                        bDirectlyCausedByPlayer: true
                                    });
                                }
                            }
                            break;

                        case "grenade":
                            if (cur.data["bRemoteDetonation"])
                            {
                                cur.data.bDetonationTimerEnabled = true;
                                cur.data.detonationTimer = 2;
                            }
                            break;

                        default:
                            this.requestEvent({
                                eventId: GameServer.EVENT_PAWN_DAMAGE,
                                damageType: DamageType.DAMAGE_EXPLOSIVE,
                                damageAmount: damageAmount,
                                pawnId: cur.data.id,
                                attackerId: instigator ? instigator.id : _causerId,
                                causerId: _causerId,
                                weaponId: _weaponId,
                                bDirectlyCausedByPlayer: true
                            });
                            break;
                    }
                }
            }
        }

    }
    detonate(_body, _directHitId)
    {
        if (_body && _body.data)
        {
            var data = _body.data;
            if (data.bDetonated)
            {
                return;
            }
            data.bDetonated = true;
            switch (data.type)
            {
                case "obstacle":
                    switch (data.obstacleId)
                    {
                        case "barrel_explosive":
                            this.createExplosion({
                                eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                                x: _body.position[0],
                                y: _body.position[1],
                                radius: 500,
                                damage: 600,
                                playerId: data.playerId ? data.playerId : data.id,
                                causerId: data.id,
                                weaponId: "barrel",
                                bDirectlyCausedByPlayer: true,
                                directHitId: _directHitId
                            });
                            this.removeNextStep(_body);
                            break;
                    }
                    break;

                case "equipment":
                    var weaponData = data["weaponData"];
                    if (weaponData)
                    {
                        var explosionX = _body.position[0];
                        var explosionY = _body.position[1] - 10;
                        switch (weaponData.id)
                        {
                            case "claymore":
                                explosionX += 50 * data.scale;
                                explosionY -= 10;
                                break;
                        }
                        this.createExplosion({
                            eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                            x: explosionX,
                            y: explosionY,
                            radius: weaponData["radius"],
                            damage: weaponData["damage"],
                            playerId: data["ownerId"] ? data["ownerId"] : data.id,
                            causerId: data.id,
                            weaponId: weaponData.id,
                            bDirectlyCausedByPlayer: true,
                            directHitId: _directHitId
                        });
                    }
                    this.removeNextStep(_body);
                    break;

                case "grenade":
                    var grenadeData = data["grenadeData"];  
                    var weaponData = this.getWeaponData(grenadeData["weaponId"]);
                    if (data.stuckToId)
                    {
                        var stuck = this.getObjectById(data.stuckToId);
                        if (stuck)
                        {
                            this.requestEvent({
                                eventId: GameServer.EVENT_PAWN_DAMAGE,
                                damageType: DamageType.DAMAGE_EXPLOSIVE,
                                damageAmount: weaponData.damage,
                                pawnId: data.stuckToId,
                                attackerId: grenadeData.playerId ? grenadeData.playerId : data.id,
                                causerId: data.id,
                                weaponId: weaponData.id,
                                bDirectlyCausedByPlayer: true
                            });
                        }
                    }
                    if (grenadeData["weaponId"] == "smoke" || grenadeData.type == Mods.GRENADE_SMOKE)
                    {
                        _body.data["destroyTimer"] = this.game.settings.fps * 8;
                        this.setDataValue(_body, "bActivated", true);
                        this.createExplosion({
                            eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                            x: _body.position[0],
                            y: _body.position[1],
                            radius: 200,
                            damage: 1,
                            playerId: grenadeData.playerId ? grenadeData.playerId : data.id,
                            causerId: data.id,
                            weaponId: grenadeData["weaponId"],
                            bDirectlyCausedByPlayer: true,
                            directHitId: _directHitId
                        });
                        _body.velocity = [0, 0];
                        _body.shapes[0].sensor = false;
                    }
                    else if (grenadeData["weaponId"] == "napalm" || grenadeData["weaponId"] == "molotov")
                    {                        
                        var firePos = _body.previousPosition ? _body.previousPosition : _body.position;
                        this.createExplosion({
                            eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                            x: firePos[0],
                            y: firePos[1],
                            radius: weaponData.radius,
                            damage: weaponData.damage,
                            playerId: grenadeData.playerId ? grenadeData.playerId : data.id,
                            causerId: data.id,
                            weaponId: grenadeData["weaponId"],
                            bDirectlyCausedByPlayer: true,
                            directHitId: _directHitId
                        });
                        var numFlames = 15;
                        for (var i = 0; i < numFlames; i++)
                        {
                            this.createFlame(_body.position, [this.Random(-500, 500), this.Random(-500, -100)], _body.data.team, grenadeData.playerId ? grenadeData.playerId : data.id, grenadeData["weaponId"], null, weaponData.fireTime);
                        }
                        this.removeNextStep(_body);
                    }
                    else
                    {
                        if (data["minTimer"] > 0)
                        {
                            this.removeNextStep(_body);
                            this.createImpactEffect(_body.position[0], _body.position[1], _body.angle, "grenade", 1);
                        }
                        else
                        {
                            var grenadePos = _body.previousPosition;
                            if (grenadePos[0] == 0 && grenadePos[1] == 0)
                            {
                                grenadePos = _body.position;
                            }
                            grenadePos[1] -= 10;
                            var weaponId = grenadeData["killstreakId"] ? grenadeData["killstreakId"] : grenadeData["weaponId"];
                            this.createExplosion({
                                eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                                x: grenadePos[0],
                                y: grenadePos[1],
                                radius: data["radius"],
                                damage: data["damage"],
                                playerId: grenadeData.playerId ? grenadeData.playerId : data.id,
                                causerId: data.id,
                                weaponId: grenadeData.type ? grenadeData.type : weaponId,
                                bDirectlyCausedByPlayer: true
                            });
                            if (_body["constraint"])
                            {
                                this.game.world.removeConstraint(_body["constraint"]);
                                delete _body["constraint"];
                                _body.collisionMask = CollisionGroups.GROUND | CollisionGroups.PROJECTILE;
                            }
                            this.removeNextStep(_body);
                        }
                    }
                    break;

                case "rocket":
                    var rocketData = data["rocketData"];
                    var rocketPos = _body.previousPosition;
                    if (rocketPos[0] == 0 && rocketPos[1] == 0)
                    {
                        rocketPos = _body.position;
                    }
                    this.createExplosion({
                        eventId: GameServer.EVENT_SPAWN_EXPLOSION,
                        x: rocketPos[0],
                        y: rocketPos[1],
                        radius: data["radius"],
                        damage: data["damage"],
                        playerId: rocketData.playerId ? rocketData.playerId : data.id,
                        causerId: data.id,
                        weaponId: rocketData.useWeaponId ? rocketData.useWeaponId : rocketData.weaponId,
                        bDirectlyCausedByPlayer: true
                    });
                    switch (rocketData.type)
                    {
                        case Rocket.TYPE_NAPALM:
                            var numFlames = 10;
                            switch (rocketData["weaponId"])
                            {
                                case Killstreaks.KILLSTREAK_NAPALM:
                                    var flameTime = 15;
                                    break;
                                default:
                                    flameTime = 5;
                                    break;
                            }
                            for (var i = 0; i < numFlames; i++)
                            {
                                this.createFlame(_body.position, [this.Random(-500, 500), this.Random(-500, -100)], _body.data.team, rocketData.playerId ? rocketData.playerId : data.id, rocketData["weaponId"], rocketData["weaponData"], flameTime);
                            }
                            break;
                    }
                    this.removeNextStep(_body);
                    break;
            }
        }
    }

    isMeleeWeapon(_weaponData)
    {
        if (_weaponData)
        {
            return (_weaponData.type == Weapon.TYPE_MELEE || _weaponData.bMelee) && !_weaponData.bEquipment;
        }
        return false;
    }

    applyWeaponMods(_weaponData, _mods)
    {
        _weaponData.mods = {};
        var mods = _weaponData.mods;
        if (_mods)
        {
            var defaultWeaponData = this.getWeaponData(_weaponData.id);
            mods[Mods.TYPE_OPTIC] = _mods[Mods.TYPE_OPTIC];
            mods[Mods.TYPE_BARREL] = _mods[Mods.TYPE_BARREL];
            mods[Mods.TYPE_ACCESSORY] = _mods[Mods.TYPE_ACCESSORY];
            mods[Mods.TYPE_AMMO] = _mods[Mods.TYPE_AMMO];

            if (_weaponData.type == Weapon.TYPE_SNIPER)
            {
                switch (mods[Mods.TYPE_OPTIC])
                {
                    case Mods.OPTIC_REFLEX:
                        _weaponData.lookModifier = 1.2;
                        break;
                    case Mods.OPTIC_EOTECH:
                        _weaponData.lookModifier = 1.35;
                        break;
                    case Mods.OPTIC_ACOG:
                        _weaponData.lookModifier = 1.5;
                        break;
                }
            }
            else
            {
                switch (mods[Mods.TYPE_OPTIC])
                {
                    case Mods.OPTIC_REFLEX:
                        _weaponData.lookModifier = defaultWeaponData.lookModifier + 0.025;
                        break;
                    case Mods.OPTIC_EOTECH:
                        _weaponData.lookModifier = defaultWeaponData.lookModifier + 0.05;
                        break;
                    case Mods.OPTIC_ACOG:
                        _weaponData.lookModifier = defaultWeaponData.lookModifier + 0.1;
                        break;
                }
            }

            switch (mods[Mods.TYPE_ACCESSORY])
            {
                case Mods.ACCESSORY_MAG_ASSIST:
                    _weaponData.reloadMultiplier = 0.4;
                    _weaponData.reloadTime = defaultWeaponData.reloadTime * 0.6;
                    break;
                case Mods.ACCESSORY_GRIP:
                    _weaponData.recoil = _weaponData.recoil * 0.5;
                    break;
                case Mods.ACCESSORY_GRIP_ANGLED:
                    //_weaponData.recoil = _weaponData.recoil * 0.25;
                    break;
                case Mods.ACCESSORY_LASER:
                    if (_weaponData.type == Weapon.TYPE_SHOTGUN)
                    {
                        _weaponData.accuracy = _weaponData.accuracy * 0.9;
                    }
                    else
                    {
                        _weaponData.accuracy = _weaponData.accuracy * 0.75;
                    }
                    break;
                case Mods.ACCESSORY_M203:
                case Mods.ACCESSORY_M320:
                case Mods.ACCESSORY_GP25:
                    if (!_weaponData.barrel)
                    {
                        _weaponData.barrel = this.getWeaponData(mods[Mods.TYPE_ACCESSORY]);
                    }
                    break;
                case Mods.ACCESSORY_MASTERKEY:
                    if (!_weaponData.barrel)
                    {
                        _weaponData.barrel = this.getWeaponData("acc_masterkey");
                    }
                    break;
            }

            switch (mods[Mods.TYPE_BARREL])
            {
                case Mods.BARREL_SILENCER:
                    _weaponData.recoil = _weaponData.recoil * 0.75;
                    _weaponData.dropRange = Math.round(_weaponData.dropRange * 0.75);
                    break;
                case Mods.BARREL_COMPENSATOR:
                    _weaponData.recoil = _weaponData.recoil * 0.5;
                    break;
                case Mods.BARREL_BRAKE:
                    _weaponData.recoil = _weaponData.recoil * 1.1;
                    _weaponData.damage = Math.round(_weaponData.damage * 1.1);
                    break;
                case Mods.BARREL_HEAVY:
                    _weaponData.dropRange = Math.round(_weaponData.dropRange * 1.25);
                    break;
            }

            switch (mods[Mods.TYPE_AMMO])
            {                
                case Mods.AMMO_FMJ:
                    _weaponData.damage = Math.round(_weaponData.damage * 1.1);
                    break;
                case Mods.AMMO_PIERCING:
                    _weaponData.penetration = _weaponData.penetration + 2;
                    break;
                case Mods.AMMO_HOLLOW_POINT:
                    _weaponData.headshotMult = (_weaponData.headshotMult ? _weaponData.headshotMult : 1.4) + 0.25;
                    break;
                case Mods.AMMO_EXTENDED:
                    switch (_weaponData.id)
                    {
                        case "l115a3":
                        case "scout":
                            _weaponData.magSize = Math.floor(defaultWeaponData.magSize * 2);
                            break;
                        default:
                            _weaponData.magSize = Math.floor(defaultWeaponData.magSize * 1.5);
                            break;
                    }
                    _weaponData.mag = _weaponData.magSize;
                    break;
                case Mods.AMMO_SLUG:
                    _weaponData.bSlug = true;
                    _weaponData.damage *= 5;
                    _weaponData.accuracy *= 0.4;
                    break;
            }
        }
    }

    matchInProgress()
    {
        if (this.game && this.game.state == MatchState.STATE_IN_PROGRESS)
        {
            return true;
        }
        return false;
    }

    isPreGame()
    {
        if (this.game && this.game.state == MatchState.STATE_PRE_GAME)
        {
            return true;
        }
        return false;
    }

    matchHasEnded()
    {
        if (!this.game)
        {
            return true;
        }
        return this.game.state == MatchState.STATE_POST_GAME;
    }

    roundHasEnded()
    {
        if (!this.game)
        {
            return true;
        }
        return this.game.state == MatchState.STATE_POST_ROUND;
    }

    isTeamGameMode()
    {
        var data = this.getGameModeData(this.game.gameModeId);
        if (data)
        {
            return data.bTeam;
        }
        return false;
    }

    getGameModeData(_id)
    {
        var modes = this.data.modes;
        for (var i = 0; i < modes.length; i++)
        {
            var mode = modes[i];
            if (mode.id == _id)
            {
                return this.clone(mode);
            }
        }
        return null;
    }

    getSharedData(_id)
    {
        var shared = this.data.shared;
        return shared[_id];
    }

    getVehicleData(_id)
    {
        var vehicles = this.data.vehicles;
        for (var i = 0; i < vehicles.length; i++)
        {
            var veh = vehicles[i];
            if (veh.id == _id)
            {
                return veh;
            }
        }
        return null;
    }

    getWeaponData(_id, _options)
    {
        var weapons = this.data.weapons;
        for (var i = 0; i < weapons.length; i++)
        {
            var wpn = weapons[i];
            if (wpn.id == _id)
            {
                var data = this.clone(wpn);
                if (_options)
                {
                    var keys = Object.keys(_options);
                    for (var j = 0; j < keys.length; j++)
                    {
                        data[keys[j]] = _options[keys[j]];
                    }
                }
                delete data.name;
                delete data.desc;
                delete data.unlockLevel;
                delete data.unlockPrestige;
                if (data.range && !data.bVehicle)
                {                           
                    switch (data.type)
                    {
                        case Weapon.TYPE_SHOTGUN:
                            data.dropRange = data.range * 0.75;
                            data.range = 1500;
                            break;
                        case Weapon.TYPE_PISTOL:
                        case Weapon.TYPE_MACHINE_PISTOL:
                        case Weapon.TYPE_SMG:
                        case Weapon.TYPE_RIFLE:
                        case Weapon.TYPE_CARBINE:
                        case Weapon.TYPE_DMR:
                        case Weapon.TYPE_SNIPER:
                        case Weapon.TYPE_LMG:
                            data.dropRange = data.range;
                            data.range = 4000;
                            break;
                    }
                }
                return data;
            }
        }
        return null;
    }

    getSpriteData(_id)
    {
        var sprites = this.data.sprites;
        if (sprites) 
        {
            return sprites[_id];
        }
        return null;
    }

    getWorldWeaponData(_id)
    {
        var weapons = this.data.weapons_world;
        if (weapons)
        {
            var data = weapons.frames[_id];
            if (data)
            {
                return data.frame;
            }
        }
        console.warn("Missing frame data:", _id);
        return { x: 0, y: 0, w: 32, h: 32 };
    }

    getMapData(_id)
    {
        var maps = this.data.maps;
        for (var i = 0; i < maps.length; i++)
        {
            var map = maps[i];
            if (map.id == _id)
            {
                return map;
            }
        }
        return null;
    }

    removeBody(_body)
    {
        if (_body)
        {
            this.detachRope(_body);
            this.game.world.removeBody(_body);
        }
    }

    removeNextStep(_body)
    {
        if (_body)
        {
            _body.data.bPendingRemoval = true;
            this.game.toRemove.push(_body);
        }
    }

    addBody(_body)
    {
        if (_body)
        {
            this.game.world.addBody(_body);
        }
    }

    getObjectById(_id)
    {
        if (!_id)
        {
            return null;
        }
        var object = this.game.objects[_id];
        if (object && object.data && !object.data.bPendingRemoval)
        {
            return object;
        }
        return null;
    }

    getPawns(_team)
    {
        var world = this.game.world;
        var arr = [];
        for (var i = 0; i < world.bodies.length; i++)
        {
            var cur = world.bodies[i];
            if (cur.data)
            {
                switch (cur.data.type)
                {
                    case "character":
                    case "turret":
                    case "helicopter":
                    case "tank":
                    case "car":
                    case "mountedWeapon":
                        if (_team != null)
                        {
                            if (cur.data.team == _team)
                            {
                                arr.push(cur);
                            }
                        }
                        else
                        {
                            arr.push(cur);
                        }
                        break;
                }
            }
        }
        return arr;
    }

    getBotClasses()
    {
        var classes = this.getSharedData("classes");
        var types = [Weapon.TYPE_RIFLE, Weapon.TYPE_SMG, Weapon.TYPE_LMG, Weapon.TYPE_SNIPER];
        var keys = Object.keys(classes);
        for (var i = 0; i < keys.length; i++)
        {
            var key = keys[i];
            var curClass = classes[key];
            var primary = curClass.primary;            
            var rand = this.Random(1, 5);
            switch (rand)
            {
                case 1:
                    var wpnType = Weapon.TYPE_DMR;
                    break;
                case 2:
                    wpnType = Weapon.TYPE_CARBINE;
                    break;
                default:
                    wpnType = types[i];
                    break;
            }
            var wpns = this.getAllWeaponsByType(wpnType);
            primary.id = wpns[this.Random(0, wpns.length - 1)].id;
            this.setRandomWeaponMods(primary);
            var secondary = curClass.secondary;
            switch (i)
            {
                case 1:
                    var s = [Weapon.TYPE_LAUNCHER];
                    break;
                default:
                    s = [Weapon.TYPE_PISTOL, Weapon.TYPE_MACHINE_PISTOL, Weapon.TYPE_SHOTGUN];
                    break;
            }
            var wpns = this.getAllWeaponsByType(s[this.Random(0, s.length - 1)]);
            secondary.id = wpns[this.Random(0, wpns.length - 1)].id;
            this.setRandomWeaponMods(secondary);
        }
        return classes;
    }

    setRandomWeaponMods(_weaponData)
    {
        if (!_weaponData.mods)
        {
            _weaponData.mods = {};
        }
        var mods = this.getModsForWeapon(_weaponData.id, Mods.TYPE_OPTIC);
        _weaponData.mods.optic = mods[this.Random(0, mods.length - 1)];
        mods = this.getModsForWeapon(_weaponData.id, Mods.TYPE_ACCESSORY);
        _weaponData.mods.accessory = mods[this.Random(0, mods.length - 1)];
        mods = this.getModsForWeapon(_weaponData.id, Mods.TYPE_BARREL);
        _weaponData.mods.barrel = mods[this.Random(0, mods.length - 1)];
        mods = this.getModsForWeapon(_weaponData.id, Mods.TYPE_AMMO);
        _weaponData.mods.ammo = mods[this.Random(0, mods.length - 1)];
    }

    getModsForWeapon(_weaponId, _modType)
    {
        var mods = [null];
        var wpn = this.getWeaponData(_weaponId);
        if (wpn)
        {
            switch (_modType)
            {
                case Mods.TYPE_OPTIC:
                    switch (wpn.id)
                    {
                        case "deagle":
                            return mods;
                    }
                    switch (wpn.type)
                    {
                        case Weapon.TYPE_PISTOL:
                        case Weapon.TYPE_MACHINE_PISTOL:
                        case Weapon.TYPE_SHOTGUN:
                            mods.push(Mods.OPTIC_REFLEX, Mods.OPTIC_EOTECH);
                            break;
                        case Weapon.TYPE_LAUNCHER:
                            return mods;
                        default:
                            mods.push(Mods.OPTIC_REFLEX, Mods.OPTIC_EOTECH, Mods.OPTIC_ACOG);
                            break;
                    }
                    break;
                case Mods.TYPE_ACCESSORY:
                    switch (wpn.type)
                    {
                        case Weapon.TYPE_PISTOL:
                        case Weapon.TYPE_MACHINE_PISTOL:
                        case Weapon.TYPE_SHOTGUN:
                            mods.push(Mods.ACCESSORY_LASER, Mods.ACCESSORY_MARKER);
                            break;
                        default:
                            mods.push(Mods.ACCESSORY_LASER, Mods.ACCESSORY_MARKER, Mods.ACCESSORY_GRIP, Mods.ACCESSORY_GRIP_ANGLED);
                            if (wpn.type == Weapon.TYPE_RIFLE)
                            {
                                mods.push(wpn.id == "ak47" ? Mods.ACCESSORY_GP25 : Mods.ACCESSORY_M320);
                            }
                            break;
                    }
                    if (!wpn.bSingleRoundLoaded && wpn.magSize > 1)
                    {
                        mods.push(Mods.ACCESSORY_MAG_ASSIST);
                    }
                    break;
                case Mods.TYPE_BARREL:
                    switch (wpn.type)
                    {
                        case Weapon.TYPE_LAUNCHER:
                            break;
                        case Weapon.TYPE_DMR:
                        case Weapon.TYPE_SNIPER:
                        case Weapon.TYPE_RIFLE:
                        case Weapon.TYPE_CARBINE:
                        case Weapon.TYPE_SMG:
                            if (!wpn.bSilenced)
                            {
                                mods.push(Mods.BARREL_COMPENSATOR, Mods.BARREL_BRAKE, Mods.BARREL_HEAVY, Mods.BARREL_SILENCER);
                            }
                            else
                            {
                                mods.push(Mods.BARREL_COMPENSATOR, Mods.BARREL_BRAKE, Mods.BARREL_HEAVY);
                            }
                            break;
                        default:
                            mods.push(Mods.BARREL_COMPENSATOR, Mods.BARREL_BRAKE, Mods.BARREL_HEAVY);
                            break;
                    }
                    break;
                case Mods.TYPE_AMMO:
                    switch (wpn.type)
                    {
                        case Weapon.TYPE_LAUNCHER:
                            if (wpn.bGrenade && wpn.magSize == 1)
                            {
                                mods.push(Mods.GRENADE_FLASH, Mods.GRENADE_SMOKE);
                            }
                            break;
                        default:
                            mods.push(Mods.AMMO_FMJ, Mods.AMMO_PIERCING, Mods.AMMO_HOLLOW_POINT, Mods.AMMO_EXTENDED, Mods.AMMO_STOPPING_POWER);
                            if (wpn.type == Weapon.TYPE_SHOTGUN && wpn.bBoltAction)
                            {
                                mods.push(Mods.AMMO_SLUG, Mods.AMMO_FRAG);
                            }
                            break;
                    }
                    break;
            }
        }
        return mods;
    }

    getAllWeaponsByType(_type)
    {
        var arr = [];
        for (var i = 0; i < this.data.weapons.length; i++)
        {
            var wpn = this.data.weapons[i];
            if (wpn.bHidden || wpn.bVehicle)
            {
                continue;
            }
            if (wpn.type == _type)
            {
                arr.push(wpn);
            }
        }
        return arr;
    }

    getRandomUniqueId()
    {
        for (var i = 0; i < 100; i++)
        {
            var id = Math.random().toString(36).substr(2, 3);
            if (!this.getObjectById(id))
            {
                return id;
            }
        }
        return id;
    }

    pxmi(v)
    {
        return v;
    }

    loadPolygon(_id, _body, _width, _height, _scale, _shapeData)
    {
        var data = this.getSpriteData(_id);
        var scale = 1;
        var cm = p2.vec2.create();
        for (var i = 0; i < data.length; i++)
        {
            var vertices = [];
            for (var s = 0; s < data[i].shape.length; s += 2)
            {
                vertices.push([
                    this.pxmi(data[i].shape[s] * scale),
                    this.pxmi(data[i].shape[s + 1] * scale)
                ]);
            }
            var c = new p2.Convex({ vertices: vertices });
            c.material = _shapeData.material;
            c.collisionGroup = _shapeData.collisionGroup;
            c.collisionMask = _shapeData.collisionMask;
            for (var j = 0; j !== c.vertices.length; j++)
            {
                var v = c.vertices[j];
                p2.vec2.sub(v, v, c.centerOfMass);
            }
            p2.vec2.scale(cm, c.centerOfMass, 1);
            cm[0] -= this.pxmi(_width / 2);
            cm[1] -= this.pxmi(_height / 2);
            c.updateTriangles();
            c.updateCenterOfMass();
            c.updateBoundingRadius();
            _body.addShape(c, cm);
        }
        _body.aabbNeedsUpdate = true;
        return true;
    }

    constrainVelocity(_body, _val)
    {
        var angle, currVelocitySqr, vx, vy;
        vx = _body.velocity[0];
        vy = _body.velocity[1];
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > _val * _val)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * _val;
            vy = Math.sin(angle) * _val;
            _body.velocity[0] = vx;
            _body.velocity[1] = vy;
        }
    }

    optimize(_data)
    {
        var keys = Object.keys(_data);
        for (var i = 0; i < keys.length; i++)
        {
            var key = keys[i];
            var val = _data[key];
            if (typeof val === "boolean")
            {
                _data[key] = val == true ? 1 : 0;
            }
            else if (typeof val === "number" && val % 1 != 0)
            {
                _data[key] = this.RoundDecimal(val);
            }                
        }
    }

    clone(_data)
    {
        return JSON.parse(JSON.stringify(_data));
    }

    Random(_min, _max)
    {
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
    }

    RandomBoolean()
    {
        return Math.random() >= 0.5;
    }

    DistBodies(_bodyA, _bodyB)
    {
        return this.Dist(_bodyA.position[0], _bodyA.position[1], _bodyB.position[0], _bodyB.position[1]);
    }

    Dist(_x1, _y1, _x2, _y2)
    {
        return Math.sqrt((_x1 - _x2) * (_x1 - _x2) + (_y1 - _y2) * (_y1 - _y2));
    }

    Angle(_x1, _y1, _x2, _y2)
    {
        var distX = _x2 - _x1;
        var distY = _y2 - _y1;
        return this.RoundDecimal(Math.atan2(distY, distX));
    }

    ToRad(_degrees)
    {
        return this.RoundDecimal(_degrees * (Math.PI / 180));
    }

    ToDeg(_radians)
    {
        return _radians * (180 / Math.PI);
    }

    WrapAngle(angle, radians)
    {
        return this.RoundDecimalFine(radians ? this.Wrap(angle, -Math.PI, Math.PI) : this.Wrap(angle, -180, 180));
    }

    Wrap(value, min, max)
    {
        var range = max - min;
        if (range <= 0)
        {
            return 0;
        }
        var result = (value - min) % range;
        if (result < 0)
        {
            result += range;
        }
        return result + min;
    }

    RoundNumberArray(_arr)
    {
        if (_arr)
        {
            return [Math.round(_arr[0]), Math.round(_arr[1])];
        }
        return _arr;
    }

    RoundDecimal(_val)
    {
        return Math.trunc(_val * 100) / 100;
    }

    RoundDecimalFine(_val)
    {
        return Math.trunc(_val * 10000) / 10000;
    }

    ShuffleArray(array)
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

}

if (typeof module !== "undefined")
{
    module.exports = {
        GameInstance: GameInstance
    };
}