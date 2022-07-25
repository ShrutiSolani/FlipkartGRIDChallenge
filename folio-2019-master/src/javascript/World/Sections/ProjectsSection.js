import * as THREE from "three";
import Project from "./Project";
import TweenLite from "gsap/TweenLite";

import accessories1Source from "../../../models/projects/Necklace1/neck.png";
import accessories2Source from "../../../models/projects/Necklace1/neck1.png";
import accessories3Source from "../../../models/projects/Necklace1/neck3.png";
import accessories4Source from "../../../models/projects/Earrings2/1.png";
import accessories5Source from "../../../models/projects/Earrings2/2.png";
import accessories6Source from "../../../models/projects/Earrings2/3.png";

import women1Source from "../../../models/projects/Dress7/women1.png";
import women2Source from "../../../models/projects/Dress7/women2.jpg";
import women3Source from "../../../models/projects/Dress7/women3.jpg";
import women4Source from "../../../models/projects/Dress7/khaki.jpg";
import women5Source from "../../../models/projects/Dress7/sneakers.jpg";
import women6Source from "../../../models/projects/Dress7/scarf.jpg";

import men1Source from "../../../models/projects/Dress7/hoodie.jpg";
import men2Source from "../../../models/projects/Dress7/jacket.jpg";
import men3Source from "../../../models/projects/Dress7/sneakers.jpg";
import men4Source from "../../../models/projects/Dress7/khakipant.jpg";
import men5Source from "../../../models/projects/Dress7/shorts.jpg";
import men6Source from "../../../models/projects/Dress7/poloshirt.png";

export default class ProjectsSection {
    constructor(_options) {
        // Options
        this.time = _options.time;
        this.resources = _options.resources;
        this.camera = _options.camera;
        this.passes = _options.passes;
        this.objects = _options.objects;
        this.areas = _options.areas;
        this.zones = _options.zones;
        this.tiles = _options.tiles;
        this.debug = _options.debug;
        this.x = _options.x;
        this.y = _options.y;

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder("projects");
            this.debugFolder.open();
        }

        // Set up
        this.items = [];

        this.interDistance = 24;
        this.positionRandomess = 5;
        this.projectHalfWidth = 9;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;
        this.container.updateMatrix();

        this.setGeometries();
        this.setMeshes();
        this.setList();
        // this.setList2()
        this.setZone();

        // Add all project from the list
        for (const _options of this.list) {
            this.add(_options);
        }
    }

    setGeometries() {
        this.geometries = {};
        this.geometries.floor = new THREE.PlaneBufferGeometry(16, 8);
    }

    setMeshes() {
        this.meshes = {};
        this.meshes.boardPlane =
            this.resources.items.projectsBoardPlane.scene.children[0];
        this.meshes.areaLabel = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 0.5),
            new THREE.MeshBasicMaterial({
                transparent: true,
                depthWrite: false,
                color: 0xffffff,
                alphaMap: this.resources.items.areaOpenTexture,
            })
        );
        this.meshes.areaLabel.matrixAutoUpdate = false;
    }

    setList() {
        this.list = [
            {
                name: "Three.js Journey",
                imageSources: [
                    accessories1Source,
                    accessories2Source,
                    accessories3Source,
                ],
                imageSourcesSecond: [
                    accessories4Source,
                    accessories5Source,
                    accessories6Source,
                ],
                floorTexture:
                    this.resources.items.projectsThreejsJourneyFloorTexture,
                link: [
                    {
                        href: "http://127.0.0.1:5000/accessories",
                        x: -4.8,
                        y: -4,
                        halfExtents: {
                            x: 3.2,
                            y: 1.5,
                        },
                    },
                ],
                distinctions: [{ type: "fwa", x: 3.95, y: 4.15 }],
            },
            {
                name: "Madbox",
                imageSources: [women1Source, women2Source, women3Source],
                imageSourcesSecond: [women4Source, women5Source, women6Source],
                floorTexture: this.resources.items.projectsMadboxFloorTexture,
                link: [
                    {
                        href: "http://127.0.0.1:3000/women1",
                        x: -4.0,
                        y: -4,
                        halfExtents: {
                            x: 2.0,
                            y: 1.5,
                        },
                    },
                    {
                        href: "http://127.0.0.1:3000/women2",
                        x: 1,
                        y: -4,
                        halfExtents: {
                            x: 2.0,
                            y: 1.5,
                        },
                    },
                    {
                        href: "http://127.0.0.1:3000/women3",
                        x: 6,
                        y: -4,
                        halfExtents: {
                            x: 2.0,
                            y: 1.5,
                        },
                    },
                ],
                distinctions: [
                    { type: "awwwards", x: 3.95, y: 4.15 },
                    { type: "fwa", x: 5.6, y: 4.15 },
                ],
            },
            {
                name: "Scout",
                imageSources: [men1Source, men2Source, men3Source],
                imageSourcesSecond: [men5Source, men4Source, men6Source],
                floorTexture: this.resources.items.projectsScoutFloorTexture,
                link: [
                    {
                        href: "http://127.0.0.1:3000/men1",
                        x: -4.0,
                        y: -4.0,
                        halfExtents: {
                            x: 2.0,
                            y: 1.5,
                        },
                    },
                    {
                        href: "http://127.0.0.1:3000/men2",
                        x: 1,
                        y: -4.0,
                        halfExtents: {
                            x: 2.0,
                            y: 1.5,
                        },
                    },
                ],
                distinctions: [],
            },
        ];
    }

    setZone() {
        const totalWidth = this.list.length * (this.interDistance / 2);

        const zone = this.zones.add({
            position: {
                x: this.x + totalWidth - this.projectHalfWidth - 6,
                y: this.y,
            },
            halfExtents: { x: totalWidth, y: 12 },
            data: { cameraAngle: "projects" },
        });

        zone.on("in", (_data) => {
            this.camera.angle.set(_data.cameraAngle);
            TweenLite.to(
                this.passes.horizontalBlurPass.material.uniforms.uStrength
                    .value,
                2,
                { x: 0 }
            );
            TweenLite.to(
                this.passes.verticalBlurPass.material.uniforms.uStrength.value,
                2,
                { y: 0 }
            );
        });

        zone.on("out", () => {
            this.camera.angle.set("default");
            TweenLite.to(
                this.passes.horizontalBlurPass.material.uniforms.uStrength
                    .value,
                2,
                { x: this.passes.horizontalBlurPass.strength }
            );
            TweenLite.to(
                this.passes.verticalBlurPass.material.uniforms.uStrength.value,
                2,
                { y: this.passes.verticalBlurPass.strength }
            );
        });
    }

    add(_options) {
        const x = this.x + this.items.length * this.interDistance;
        let y = this.y;
        if (this.items.length > 0) {
            y += (Math.random() - 0.5) * this.positionRandomess;
        }

        // Create project
        const project = new Project({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            areas: this.areas,
            geometries: this.geometries,
            meshes: this.meshes,
            debug: this.debugFolder,
            x: x,
            y: y,
            ..._options,
        });

        this.container.add(project.container);
        this.items.push(project);
    }
}
