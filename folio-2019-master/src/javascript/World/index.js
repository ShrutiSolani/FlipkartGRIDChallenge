import * as THREE from "three";
import Materials from "./Materials.js";
import Floor from "./Floor.js";
import Shadows from "./Shadows.js";
import Physics from "./Physics.js";
import Zones from "./Zones.js";
import Objects from "./Objects.js";
import Car from "./Car.js";
import Areas from "./Areas.js";
import Tiles from "./Tiles.js";
import Walls from "./Walls.js";
import IntroSection from "./Sections/IntroSection.js";
import ProjectsSection from "./Sections/ProjectsSection.js";
import CrossroadsSection from "./Sections/CrossroadsSection.js";
import InformationSection from "./Sections/InformationSection.js";
import FitnessSection from "./Sections/FitnessSection.js";
// import PlaygroundSection from "./Sections/PlaygroundSection.js";
// import DistinctionASection from './Sections/DistinctionASection.js'
// import DistinctionBSection from './Sections/DistinctionBSection.js'
// import DistinctionCSection from './Sections/DistinctionCSection.js'
// import DistinctionDSection from './Sections/DistinctionDSection.js'
import Controls from "./Controls.js";
import Sounds from "./Sounds.js";
import { TweenLite } from "gsap/TweenLite";
import { Power2 } from "gsap/EasePack";
import EasterEggs from "./EasterEggs.js";

export default class {
    constructor(_options) {
        // Options
        this.config = _options.config;
        this.debug = _options.debug;
        this.resources = _options.resources;
        this.time = _options.time;
        this.sizes = _options.sizes;
        this.camera = _options.camera;
        this.renderer = _options.renderer;
        this.passes = _options.passes;

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder("world");
            this.debugFolder.open();
        }

        // Set up
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        // this.setAxes()
        this.setSounds();
        this.setControls();
        this.setFloor();
        this.setAreas();
        this.setStartingScreen();
    }

    start() {
        window.setTimeout(() => {
            this.camera.pan.enable();
        }, 2000);

        this.setReveal();
        this.setMaterials();
        this.setShadows();
        this.setPhysics();
        this.setZones();
        this.setObjects();
        this.setCar();
        this.areas.car = this.car;
        // this.setTiles();
        this.setWalls();
        this.setSections();
        // this.setEasterEggs();
    }

    setReveal() {
        this.reveal = {};
        this.reveal.matcapsProgress = 0;
        this.reveal.floorShadowsProgress = 0;
        this.reveal.previousMatcapsProgress = null;
        this.reveal.previousFloorShadowsProgress = null;

        // Go method
        this.reveal.go = () => {
            TweenLite.fromTo(
                this.reveal,
                3,
                { matcapsProgress: 0 },
                { matcapsProgress: 1 }
            );
            TweenLite.fromTo(
                this.reveal,
                3,
                { floorShadowsProgress: 0 },
                { floorShadowsProgress: 1, delay: 0.5 }
            );
            TweenLite.fromTo(
                this.shadows,
                3,
                { alpha: 0 },
                { alpha: 0.5, delay: 0.5 }
            );

            if (this.sections.intro) {
                TweenLite.fromTo(
                    this.sections.intro.instructions.arrows.label.material,
                    0.3,
                    { opacity: 0 },
                    { opacity: 1, delay: 0.5 }
                );
                if (this.sections.intro.otherInstructions) {
                    TweenLite.fromTo(
                        this.sections.intro.otherInstructions.label.material,
                        0.3,
                        { opacity: 0 },
                        { opacity: 1, delay: 0.75 }
                    );
                }
            }

            // Car
            this.physics.car.chassis.body.sleep();
            this.physics.car.chassis.body.position.set(0, 0, 12);

            window.setTimeout(() => {
                this.physics.car.chassis.body.wakeUp();
            }, 300);

            // Sound
            TweenLite.fromTo(
                this.sounds.engine.volume,
                0.5,
                { master: 0 },
                { master: 0.7, delay: 0.3, ease: Power2.easeIn }
            );
            window.setTimeout(() => {
                this.sounds.play("reveal");
            }, 400);

            // Controls
            if (this.controls.touch) {
                window.setTimeout(() => {
                    this.controls.touch.reveal();
                }, 400);
            }
        };

        // Time tick
        this.time.on("tick", () => {
            // Matcap progress changed
            if (
                this.reveal.matcapsProgress !==
                this.reveal.previousMatcapsProgress
            ) {
                // Update each material
                for (const _materialKey in this.materials.shades.items) {
                    const material = this.materials.shades.items[_materialKey];
                    material.uniforms.uRevealProgress.value =
                        this.reveal.matcapsProgress;
                }

                // Save
                this.reveal.previousMatcapsProgress =
                    this.reveal.matcapsProgress;
            }

            // Matcap progress changed
            if (
                this.reveal.floorShadowsProgress !==
                this.reveal.previousFloorShadowsProgress
            ) {
                // Update each floor shadow
                for (const _mesh of this.objects.floorShadows) {
                    _mesh.material.uniforms.uAlpha.value =
                        this.reveal.floorShadowsProgress;
                }

                // Save
                this.reveal.previousFloorShadowsProgress =
                    this.reveal.floorShadowsProgress;
            }
        });

        // Debug
        if (this.debug) {
            this.debugFolder
                .add(this.reveal, "matcapsProgress")
                .step(0.0001)
                .min(0)
                .max(1)
                .name("matcapsProgress");
            this.debugFolder
                .add(this.reveal, "floorShadowsProgress")
                .step(0.0001)
                .min(0)
                .max(1)
                .name("floorShadowsProgress");
            this.debugFolder.add(this.reveal, "go").name("reveal");
        }
    }

    setStartingScreen() {
        this.startingScreen = {};

        // Area
        this.startingScreen.area = this.areas.add({
            position: new THREE.Vector2(0, 0),
            halfExtents: new THREE.Vector2(2.35, 1.5),
            hasKey: false,
            testCar: false,
            active: false,
        });

        // Loading label
        this.startingScreen.loadingLabel = {};
        this.startingScreen.loadingLabel.geometry =
            new THREE.PlaneBufferGeometry(2.5, 2.5 / 4);
        this.startingScreen.loadingLabel.image = new Image();
        this.startingScreen.loadingLabel.image.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABABAMAAAAHc7SNAAAAMFBMVEUAAAD///9ra2ucnJzR0dH09PQmJiaNjY24uLjp6end3d1CQkLFxcVYWFiqqqp9fX3nQ5qrAAAEVUlEQVRo3u3YT08TQRQA8JEtW6CATGnDdvljaTwYE2IBI/HGRrwSetGTsZh4MPFQYiQe229gE++WePFY9Oqh1cRzieEDYIgXLxjPJu5M33vbZQszW+fgoS+B7ewO836znRl2lg1jGMP4P2Okw0yFvaKsklr3I99Tvl3iPPelGbQhKqxB4eN6N/7gVcsvbEAz1F4RLn67zzl/v6/oLvejGBQ9LsNphio4UFjmEAsVJuOK/zkDtc6w+gyTcZ3LyP6IAzjBDA+pj6LkEgAjW4kANsMAC6vmOvqAMU5RgVOTskQACicCmCcA9AXjkT5gj1MswqlxWcoTgKJ6HuAQAD5guNoAu8QpMnBul1ONMGD2PCBbRgDAKYq6AEtmXvtdj3S6GhRyW1t1DvkAgM0ggG7mu1t3xWFHFzAqv3wYCi0mY1UCGgiQPU+1oWIY8LoXcAA3qeYfr+kClvHW14PJ5OfCAgHYNAoDAORBQIrDvHjqH5c0ANTbORzBacbAQgUC2IAKAzI9gCSHlWEMLmgBPJxMvyARpIICALDm4nkAbwIA71EZx5UOgO48JnLoOhQIAN9sOgKoBoAE5r0aB8ARcNhtFzrg0VQmwCp8CAMeAADGc44S5GMBsF1aCEU2LcAcAPDCvwFytBDehCaUgJxRAKeF8BNUUQJ43iiAUlqwFKoBrTCAHjiagwEgU0YM5IYWYD4KoIgPwIXQwUbVgCXzgLpIBJNeDciWTQNskVsq1ADX/6kYBdCTjse5owbMiX+IpgGWOCPSuWpA2vN/TAMm5QTYg5IC4FdbMA0YF5Nb5s2rAaLyhzBgektGZWDArrgqi0U1QHxf38OABDwUDgTAjGfyPlTVgJT/67FBACbqyGYaaoBctQwD2vI4DecVAPkgZRhQlxPQks2rAePGAbZsRlaa1QBYEQBUHRCAmaXD0QDYxgFWdye05R9cDQCrmQYkeBA6gGXTgNEeQF4DMG4S4MLjOUZRA5A0CcjADgmjqgGwSwSg9wK1GIBS74KTgTxv/EHoiaVQsTOS5RoCJuiZyosB8EIrHpyowFiYofO0i4wCjhCQwL0hq2sCaFNM22S4JXloLk0AuLDTBzCBAAt3xykeA7CHe/mDbgdTvQ9GswSAwdbqA0giYASHjQUJnhQKhQ6z/d8rDA4hAG2Dsk042ejubHMM2nV6AMf93pCkaRjhh0WsWuz+6aasl2FwiAImReEts1/CSaFfwFouAJxC4RW+I4oCThBQE1X2WbKkBFDkqYDtJ0SHaYKq3pJJwCECjjiFPoC1w+2P0gumurgeBjT6AhIIGKOelGIAngWlFnRnMZjMIYBb7gtIIsAuYU+8GICpEhYyZVgIZ2g9rYYAX1lfAKvjnxzjnWrHALDn9K1h2k2aoI1ewGd2AWAVAVMHcKdW4wDYje739pNufJXhkJohgLu9zy4CHCKAJYUge4ddCojGyPrp9kaHmYjUi9N7+2wYwxjGZfEXMKxGE0GkkfIAAAAASUVORK5CYII=";
        this.startingScreen.loadingLabel.texture = new THREE.Texture(
            this.startingScreen.loadingLabel.image
        );
        this.startingScreen.loadingLabel.texture.magFilter =
            THREE.NearestFilter;
        this.startingScreen.loadingLabel.texture.minFilter = THREE.LinearFilter;
        this.startingScreen.loadingLabel.texture.needsUpdate = true;
        this.startingScreen.loadingLabel.material = new THREE.MeshBasicMaterial(
            {
                transparent: true,
                depthWrite: false,
                color: 0xffffff,
                alphaMap: this.startingScreen.loadingLabel.texture,
            }
        );
        this.startingScreen.loadingLabel.mesh = new THREE.Mesh(
            this.startingScreen.loadingLabel.geometry,
            this.startingScreen.loadingLabel.material
        );
        this.startingScreen.loadingLabel.mesh.matrixAutoUpdate = false;
        this.container.add(this.startingScreen.loadingLabel.mesh);

        // Start label
        this.startingScreen.startLabel = {};
        this.startingScreen.startLabel.geometry = new THREE.PlaneBufferGeometry(
            2.5,
            2.5 / 4
        );
        this.startingScreen.startLabel.image = new Image();
        this.startingScreen.startLabel.image.src =
            "data:image/png;base64,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";
        this.startingScreen.startLabel.texture = new THREE.Texture(
            this.startingScreen.startLabel.image
        );
        this.startingScreen.startLabel.texture.magFilter = THREE.NearestFilter;
        this.startingScreen.startLabel.texture.minFilter = THREE.LinearFilter;
        this.startingScreen.startLabel.texture.needsUpdate = true;
        this.startingScreen.startLabel.material = new THREE.MeshBasicMaterial({
            transparent: true,
            depthWrite: false,
            color: 0xffffff,
            alphaMap: this.startingScreen.startLabel.texture,
        });
        this.startingScreen.startLabel.material.opacity = 0;
        this.startingScreen.startLabel.mesh = new THREE.Mesh(
            this.startingScreen.startLabel.geometry,
            this.startingScreen.startLabel.material
        );
        this.startingScreen.startLabel.mesh.matrixAutoUpdate = false;
        this.container.add(this.startingScreen.startLabel.mesh);

        // Progress
        this.resources.on("progress", (_progress) => {
            // Update area
            this.startingScreen.area.floorBorder.material.uniforms.uAlpha.value = 1;
            this.startingScreen.area.floorBorder.material.uniforms.uLoadProgress.value =
                _progress;
        });

        // Ready
        this.resources.on("ready", () => {
            window.requestAnimationFrame(() => {
                this.startingScreen.area.activate();

                TweenLite.to(
                    this.startingScreen.area.floorBorder.material.uniforms
                        .uAlpha,
                    0.3,
                    { value: 0.3 }
                );
                TweenLite.to(this.startingScreen.loadingLabel.material, 0.3, {
                    opacity: 0,
                });
                TweenLite.to(this.startingScreen.startLabel.material, 0.3, {
                    opacity: 1,
                    delay: 0.3,
                });
            });
        });

        // On interact, reveal
        this.startingScreen.area.on("interact", () => {
            this.startingScreen.area.deactivate();
            TweenLite.to(
                this.startingScreen.area.floorBorder.material.uniforms
                    .uProgress,
                0.3,
                { value: 0, delay: 0.4 }
            );

            TweenLite.to(this.startingScreen.startLabel.material, 0.3, {
                opacity: 0,
                delay: 0.4,
            });

            this.start();

            window.setTimeout(() => {
                this.reveal.go();
            }, 600);
        });
    }

    setSounds() {
        this.sounds = new Sounds({
            debug: this.debugFolder,
            time: this.time,
        });
    }

    setAxes() {
        this.axis = new THREE.AxesHelper();
        this.container.add(this.axis);
    }

    setControls() {
        this.controls = new Controls({
            config: this.config,
            sizes: this.sizes,
            time: this.time,
            camera: this.camera,
            sounds: this.sounds,
        });
    }

    setMaterials() {
        this.materials = new Materials({
            resources: this.resources,
            debug: this.debugFolder,
        });
    }

    setFloor() {
        this.floor = new Floor({
            debug: this.debugFolder,
        });

        this.container.add(this.floor.container);
    }

    setShadows() {
        this.shadows = new Shadows({
            time: this.time,
            debug: this.debugFolder,
            renderer: this.renderer,
            camera: this.camera,
        });
        this.container.add(this.shadows.container);
    }

    setPhysics() {
        this.physics = new Physics({
            config: this.config,
            debug: this.debug,
            time: this.time,
            sizes: this.sizes,
            controls: this.controls,
            sounds: this.sounds,
        });

        this.container.add(this.physics.models.container);
    }

    setZones() {
        this.zones = new Zones({
            time: this.time,
            physics: this.physics,
            debug: this.debugFolder,
        });
        this.container.add(this.zones.container);
    }

    setAreas() {
        this.areas = new Areas({
            config: this.config,
            resources: this.resources,
            debug: this.debug,
            renderer: this.renderer,
            camera: this.camera,
            car: this.car,
            sounds: this.sounds,
            time: this.time,
        });

        this.container.add(this.areas.container);
    }

    setTiles() {
        this.tiles = new Tiles({
            resources: this.resources,
            objects: this.objects,
            debug: this.debug,
        });
    }

    setWalls() {
        this.walls = new Walls({
            resources: this.resources,
            objects: this.objects,
        });
    }

    setObjects() {
        this.objects = new Objects({
            time: this.time,
            resources: this.resources,
            materials: this.materials,
            physics: this.physics,
            shadows: this.shadows,
            sounds: this.sounds,
            debug: this.debugFolder,
        });
        this.container.add(this.objects.container);

        // window.requestAnimationFrame(() =>
        // {
        //     this.objects.merge.update()
        // })
    }

    setCar() {
        this.car = new Car({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            physics: this.physics,
            shadows: this.shadows,
            materials: this.materials,
            controls: this.controls,
            sounds: this.sounds,
            renderer: this.renderer,
            camera: this.camera,
            debug: this.debugFolder,
            config: this.config,
        });
        this.container.add(this.car.container);
    }

    setSections() {
        this.sections = {};

        // Generic options
        const options = {
            config: this.config,
            time: this.time,
            resources: this.resources,
            camera: this.camera,
            passes: this.passes,
            objects: this.objects,
            areas: this.areas,
            zones: this.zones,
            walls: this.walls,
            tiles: this.tiles,
            debug: this.debugFolder,
        };

        // // Distinction A
        // this.sections.distinctionA = new DistinctionASection({
        //     ...options,
        //     x: 0,
        //     y: - 15
        // })
        // this.container.add(this.sections.distinctionA.container)

        // // Distinction B
        // this.sections.distinctionB = new DistinctionBSection({
        //     ...options,
        //     x: 0,
        //     y: - 15
        // })
        // this.container.add(this.sections.distinctionB.container)

        // // Distinction C
        // this.sections.distinctionC = new DistinctionCSection({
        //     ...options,
        //     x: 0,
        //     y: 0
        // })
        // this.container.add(this.sections.distinctionC.container)

        // // Distinction D
        // this.sections.distinctionD = new DistinctionDSection({
        //     ...options,
        //     x: 0,
        //     y: 0
        // })
        // this.container.add(this.sections.distinctionD.container)

        // Intro
        this.sections.intro = new IntroSection({
            ...options,
            x: 0,
            y: 0,
        });
        this.container.add(this.sections.intro.container);

        // Crossroads
        this.sections.crossroads = new CrossroadsSection({
            ...options,
            x: 0,
            y: -30,
        });
        this.container.add(this.sections.crossroads.container);

        // Projects
        this.sections.projects = new ProjectsSection({
            ...options,
            x: 30,
            y: -30,
            // x: 0,
            // y: 0
        });
        this.container.add(this.sections.projects.container);

        // Information
        this.sections.information = new InformationSection({
            ...options,
            x: -20,
            y: -45,
            // x: 0,
            // y: - 10
        });
        this.container.add(this.sections.information.container);
        // Fitness
        this.sections.fitness = new FitnessSection({
            ...options,
            x: -1.2,
            y: -10,
            // x: 0,
            // y: - 10
        });
        this.container.add(this.sections.fitness.container);

        // Playground
        // this.sections.playground = new PlaygroundSection({
        //     ...options,
        //     x: -38,
        //     y: -34,
        //     // x: - 15,
        //     // y: - 4
        // });
        // this.container.add(this.sections.playground.container);
    }

    // setEasterEggs() {
    //     this.easterEggs = new EasterEggs({
    //         resources: this.resources,
    //         car: this.car,
    //         walls: this.walls,
    //         objects: this.objects,
    //         materials: this.materials,
    //         areas: this.areas,
    //         config: this.config,
    //         physics: this.physics,
    //     });
    //     this.container.add(this.easterEggs.container);
    // }
}
