import React from "react";
import { CanvasContextI } from "../../common/types";

const CanvasContext = React.createContext<CanvasContextI>({backgroundRef:null,playerRef:null, objectsRef:null});

export default CanvasContext;