import * as THREE from "three";

import Loader from "./Utils/Loader.js";
import EventEmitter from "./Utils/EventEmitter.js";

// Matcaps
import matcapBeigeSource from "../models/matcaps/beige.png";
import matcapBlackSource from "../models/matcaps/black.png";
import matcapOrangeSource from "../models/matcaps/orange.png";
import matcapRedSource from "../models/matcaps/red.png";
import matcapWhiteSource from "../models/matcaps/white.png";
import matcapGreenSource from "../models/matcaps/green.png";
import matcapBrownSource from "../models/matcaps/brown.png";
import matcapGraySource from "../models/matcaps/gray.png";
import matcapEmeraldGreenSource from "../models/matcaps/emeraldGreen.png";
import matcapPurpleSource from "../models/matcaps/purple.png";
import matcapBlueSource from "../models/matcaps/blue.png";
import matcapYellowSource from "../models/matcaps/yellow.png";
import matcapMetalSource from "../models/matcaps/metal.png";
import matcapVibrantBlueSource from "../models/matcaps/vibrantBlue.png";
import matcapGoldSource from "../models/matcaps/gold.png";

// Intro
import introStaticBaseSource from "../models/intro/static/base.glb";
import introStaticCollisionSource from "../models/intro/static/collision.glb";
import introStaticFloorShadowSource from "../models/intro/static/floorShadow.png";
import introInstructionsLabelsSource from "../models/intro/instructions/labels.glb";
import introInstructionsArrowsSource from "../models/intro/instructions/arrows.png";
import introInstructionsControlsSource from "../models/intro/instructions/controls.png";
import introInstructionsOtherSource from "../models/intro/instructions/other.png";
import introArrowKeyBaseSource from "../models/intro/arrowKey/base.glb";
import introArrowKeyCollisionSource from "../models/intro/arrowKey/collision.glb";
import chatLogoSource from "../models/intro/chat.png";

// Crossroads
import crossroadsStaticFloorShadowSource from "../models/crossroads/static/floorShadow.png";
import crossroadsStaticBaseSource from "../models/crossroads/static/base.glb";
import crossroadsStaticCollisionSource from "../models/crossroads/static/collision.glb";

// Car default
import carDefaultChassisSource from "../models/car/default/chassis.glb";
import carDefaultWheelSource from "../models/car/default/wheel.glb";
import carDefaultBackLightsBrakeSource from "../models/car/default/backLightsBrake.glb";
import carDefaultBackLightsReverseSource from "../models/car/default/backLightsReverse.glb";
import carDefaultAntenaSource from "../models/car/default/antena.glb";
// Car cyber truck
import carCyberTruckChassisSource from "../models/car/cyberTruck/chassis.glb";
import carCyberTruckWheelSource from "../models/car/cyberTruck/wheel.glb";
import carCyberTruckBackLightsBrakeSource from "../models/car/cyberTruck/backLightsBrake.glb";
import carCyberTruckBackLightsReverseSource from "../models/car/cyberTruck/backLightsReverse.glb";
import carCyberTruckAntenaSource from "../models/car/cyberTruck/antena.glb";

// fashion
import fashionBoardStructureSource from "../models/fashion/board/structure.glb";
import fashionBoardCollisionSource from "../models/fashion/board/collision.glb";
import fashionBoardStructureFloorShadowSource from "../models/fashion/board/floorShadow.png";
import fashionBoardPlaneSource from "../models/fashion/board/plane.glb";

import fashionAccessoriesFloorSource from "../models/fashion/labels/accessories.png";
import fashionWomenFloorSource from "../models/fashion/labels/women.png";
import fashionMenFloorSource from "../models/fashion/labels/men.png";
import fashionElectronicsFloorSource from "../models/fashion/labels/electronics.png";


// Fitness
import fitnessStaticBaseSource from "../models/fitness/static/base.glb";
import fitnessStaticCollisionSource from "../models/fitness/static/collision.glb";
import fitnessStaticFloorShadowSource from "../models/fitness/static/floorShadow.png";

// Information
import informationStaticBaseSource from "../models/information/static/base.glb";
import informationStaticCollisionSource from "../models/information/static/collision.glb";
import informationStaticFloorShadowSource from "../models/information/static/floorShadow.png";
import informationBaguetteBaseSource from "../models/information/baguette/base.glb";
import informationBaguetteCollisionSource from "../models/information/baguette/collision.glb";

import microwaveSource from "../models/information/static/MICROWAVE.png";
import televisionSource from "../models/information/static/tv.png";
import fridgeSource from "../models/information/static/fridge.png";
import laptopSource from "../models/information/static/laptop.png";
import smartphoneSource from "../models/information/static/phone.png";
import washingmachineSource from "../models/information/static/wm.png";

import dumbelSource from "../models/fitness/static/dumbel.png";
import basketBallSource from "../models/fitness/static/bball.png";
import benchSource from "../models/fitness/static/bench.png";
import cycleSource from "../models/fitness/static/cycle.png";
import hyperExtensionSource from "../models/fitness/static/hyper.png";
import skateboardSource from "../models/fitness/static/skateboard.png";
import skillToolsSource from "../models/fitness/static/skilltools.png";
import treadmillSource from "../models/fitness/static/treadmill.png";
import volleyBallSource from "../models/fitness/static/vball.png";
import weightsSource from "../models/fitness/static/weights.png";


import informationActivitiesSource from "../models/information/static/activities.png";


import areaOpenSource from "../models/area/open.png";

// Konami
import konamiLabelTouchSource from "../models/konami/label-touch.png";

// Wigs
import wig1Source from "../models/wigs/wig1.glb";
import wig2Source from "../models/wigs/wig2.glb";
import wig3Source from "../models/wigs/wig3.glb";
import wig4Source from "../models/wigs/wig4.glb";

export default class Resources extends EventEmitter {
    constructor() {
        super();

        this.loader = new Loader();
        this.items = {};

        this.loader.load([
            // Matcaps
            { name: "matcapBeige", source: matcapBeigeSource, type: "texture" },
            { name: "matcapBlack", source: matcapBlackSource, type: "texture" },
            {
                name: "matcapOrange",
                source: matcapOrangeSource,
                type: "texture",
            },
            { name: "matcapRed", source: matcapRedSource, type: "texture" },
            { name: "matcapWhite", source: matcapWhiteSource, type: "texture" },
            { name: "matcapGreen", source: matcapGreenSource, type: "texture" },
            { name: "matcapBrown", source: matcapBrownSource, type: "texture" },
            { name: "matcapGray", source: matcapGraySource, type: "texture" },
            {
                name: "matcapEmeraldGreen",
                source: matcapEmeraldGreenSource,
                type: "texture",
            },
            {
                name: "matcapPurple",
                source: matcapPurpleSource,
                type: "texture",
            },
            { name: "matcapBlue", source: matcapBlueSource, type: "texture" },
            {
                name: "matcapYellow",
                source: matcapYellowSource,
                type: "texture",
            },
            { name: "matcapMetal", source: matcapMetalSource, type: "texture" },
            { name: "matcapGold", source: matcapGoldSource, type: "texture" },
            {
                name: "matcapVibrantBlue",
                source: matcapVibrantBlueSource,
                type: "texture",
            },

            { name: "areaOpen", source: areaOpenSource, type: "texture" },

            // Intro
            { name: "introStaticBase", source: introStaticBaseSource },
            {
                name: "introStaticCollision",
                source: introStaticCollisionSource,
            },
            {
                name: "introStaticFloorShadow",
                source: introStaticFloorShadowSource,
                type: "texture",
            },

            {
                name: "introInstructionsLabels",
                source: introInstructionsLabelsSource,
            },
            {
                name: "introInstructionsArrows",
                source: introInstructionsArrowsSource,
                type: "texture",
            },
            {
                name: "introInstructionsControls",
                source: introInstructionsControlsSource,
                type: "texture",
            },
            {
                name: "introInstructionsOther",
                source: introInstructionsOtherSource,
                type: "texture",
            },

            { name: "introArrowKeyBase", source: introArrowKeyBaseSource },
            {
                name: "introArrowKeyCollision",
                source: introArrowKeyCollisionSource,
            },
            {
                name: "chatLogo",
                source: chatLogoSource,
                type: "texture"
            },

            // Intro
            {
                name: "crossroadsStaticBase",
                source: crossroadsStaticBaseSource,
            },
            {
                name: "crossroadsStaticCollision",
                source: crossroadsStaticCollisionSource,
            },
            {
                name: "crossroadsStaticFloorShadow",
                source: crossroadsStaticFloorShadowSource,
                type: "texture",
            },

            // Car default
            { name: "carDefaultChassis", source: carDefaultChassisSource },
            { name: "carDefaultWheel", source: carDefaultWheelSource },
            {
                name: "carDefaultBackLightsBrake",
                source: carDefaultBackLightsBrakeSource,
            },
            {
                name: "carDefaultBackLightsReverse",
                source: carDefaultBackLightsReverseSource,
            },
            { name: "carDefaultAntena", source: carDefaultAntenaSource },
        
            // Car default
            {
                name: "carCyberTruckChassis",
                source: carCyberTruckChassisSource,
            },
            { name: "carCyberTruckWheel", source: carCyberTruckWheelSource },
            {
                name: "carCyberTruckBackLightsBrake",
                source: carCyberTruckBackLightsBrakeSource,
            },
            {
                name: "carCyberTruckBackLightsReverse",
                source: carCyberTruckBackLightsReverseSource,
            },
            { name: "carCyberTruckAntena", source: carCyberTruckAntenaSource },

            // Project
            {
                name: "fashionBoardStructure",
                source: fashionBoardStructureSource,
            },
            {
                name: "fashionBoardCollision",
                source: fashionBoardCollisionSource,
            },
            {
                name: "fashionBoardStructureFloorShadow",
                source: fashionBoardStructureFloorShadowSource,
                type: "texture",
            },
            { name: "fashionBoardPlane", source: fashionBoardPlaneSource },
            {
                name: "fashionAccessoriesFloor",
                source: fashionAccessoriesFloorSource,
                type: "texture",
            },
            {
                name: "fashionWomenFloor",
                source: fashionWomenFloorSource,
                type: "texture",
            },
            {
                name: "fashionMenFloor",
                source: fashionMenFloorSource,
                type: "texture",
            },
        
            // Fitness
            {
                name: "fitnessStaticBase",
                source: fitnessStaticBaseSource,
            },
            {
                name: "fitnessStaticCollision",
                source: fitnessStaticCollisionSource,
            },
            {
                name: "fitnessStaticFloorShadow",
                source: fitnessStaticFloorShadowSource,
                type: "texture",
            },
            // Information
            {
                name: "informationStaticBase",
                source: informationStaticBaseSource,
            },
            {
                name: "informationStaticCollision",
                source: informationStaticCollisionSource,
            },
            {
                name: "informationStaticFloorShadow",
                source: informationStaticFloorShadowSource,
                type: "texture",
            },

            {
                name: "informationBaguetteBase",
                source: informationBaguetteBaseSource,
            },
            {
                name: "informationBaguetteCollision",
                source: informationBaguetteCollisionSource,
            },
            {
                name: "fridgeLabel",
                source: fridgeSource,
                type: "texture",
            },
            {
                name: "laptopLabel",
                source: laptopSource,
                type: "texture",
            },
            {
                name: "microwaveLabel",
                source: microwaveSource,
                type: "texture",
            },
            {
                name: "smartphoneLabel",
                source: smartphoneSource,
                type: "texture",
            },
            {
                name: "televisionLabel",
                source: televisionSource,
                type: "texture",
            },
            {
                name: "washingmachineLabel",
                source: washingmachineSource,
                type: "texture",
            },
            {
                name: "informationActivities",
                source: informationActivitiesSource,
                type: "texture",
            },
            {
                name: "dumbelLabel",
                source: dumbelSource,
                type: "texture"
            },
            {
                name: "basketBallLabel",
                source: basketBallSource,
                type: "texture",
            },
            {
                name: "benchLabel",
                source: benchSource,
                type: "texture",
            },
            {
                name: "cycleLabel",
                source: cycleSource,
                type: "texture",
            },
            {
                name: "hyperExtensionLabel",
                source: hyperExtensionSource,
                type: "texture",
            },
            {
                name: "skateboardLabel",
                source: skateboardSource,
                type: "texture",
            },
            {
                name: "skillToolsLabel",
                source: skillToolsSource,
                type: "texture",
            },
            {
                name: "treadmillLabel",
                source: treadmillSource,
                type: "texture",
            },
            {
                name: "volleyBallLabel",
                source: volleyBallSource,
                type: "texture",
            },
            {
                name: "weightsLabel",
                source: weightsSource,
                type: "texture",
            },
            // Konami
            {
                name: "konamiLabelTouch",
                source: konamiLabelTouchSource,
                type: "texture",
            },

            // Wigs
            { name: "wig1", source: wig1Source },
            { name: "wig2", source: wig2Source },
            { name: "wig3", source: wig3Source },
            { name: "wig4", source: wig4Source },
        ]);

        this.loader.on("fileEnd", (_resource, _data) => {
            this.items[_resource.name] = _data;

            // Texture
            if (_resource.type === "texture") {
                const texture = new THREE.Texture(_data);
                texture.needsUpdate = true;

                this.items[`${_resource.name}Texture`] = texture;
            }

            // Trigger progress
            this.trigger("progress", [this.loader.loaded / this.loader.toLoad]);
        });

        this.loader.on("end", () => {
            // Trigger ready
            this.trigger("ready");
        });
    }
}
