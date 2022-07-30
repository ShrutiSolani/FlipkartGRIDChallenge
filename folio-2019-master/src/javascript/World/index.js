import * as THREE from "three";
import Materials from "./Materials.js";
import Floor from "./Floor.js";
import Shadows from "./Shadows.js";
import Physics from "./Physics.js";
import Zones from "./Zones.js";
import Objects from "./Objects.js";
import Car from "./Car.js";
import Areas from "./Areas.js";
import Walls from "./Walls.js";
import IntroSection from "./Sections/IntroSection.js";
import FashionSection from "./Sections/FashionSection.js";
import CrossroadsSection from "./Sections/CrossroadsSection.js";
import InformationSection from "./Sections/InformationSection.js";
import FitnessSection from "./Sections/FitnessSection.js";
import Controls from "./Controls.js";
import Sounds from "./Sounds.js";
import { TweenLite } from "gsap/TweenLite";
import { Power2 } from "gsap/EasePack";

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
        this.setWalls();
        this.setSections();
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
            4,
            3 / 2
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

        // Fashion
        this.sections.fashioncategories = new FashionSection({
            ...options,
            x: 30,
            y: -30
        });
        this.container.add(this.sections.fashioncategories.container);

        // Information
        this.sections.information = new InformationSection({
            ...options,
            x: -20,
            y: -45
        });
        this.container.add(this.sections.information.container);
        // Fitness
        this.sections.fitness = new FitnessSection({
            ...options,
            x: -1.2,
            y: -10
        });
        this.container.add(this.sections.fitness.container);
    }
}
