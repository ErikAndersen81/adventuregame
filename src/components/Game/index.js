"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Controller_1 = require("../Controller");
var PlayerInfo_1 = require("../PlayerInfo");
var Context_1 = require("../Context");
var World_1 = require("../World");
var Game = function (props) {
    var _a = react_1.useState(false), playerMoving = _a[0], setPlayerMoving = _a[1];
    var _b = react_1.useState("down"), playerDirection = _b[0], setPlayerDirection = _b[1];
    var playerCtx = {
        moving: playerMoving,
        setMoving: setPlayerMoving,
        direction: playerDirection,
        setDirection: setPlayerDirection
    };
    console.log("testing....");
    return (<Context_1.PlayerContext.Provider value={playerCtx}>
	    <World_1["default"] level={props.level}/>
	    <div className="w3-content overlay">
	      <PlayerInfo_1.HealthBar />
	      <Controller_1["default"] />
	    </div>
	    {null && <PlayerInfo_1["default"] />}
	</Context_1.PlayerContext.Provider>);
};
exports["default"] = Game;
