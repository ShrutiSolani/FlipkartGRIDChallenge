import * as THREE from "three";

export default class FitnessSection {
    constructor(_options) {
        // Options
        this.time = _options.time;
        this.resources = _options.resources;
        this.objects = _options.objects;
        this.areas = _options.areas;
        this.tiles = _options.tiles;
        this.debug = _options.debug;
        this.x = _options.x;
        this.y = _options.y;

        // Set up
        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.setStatic();
        this.setLinksRow1();
        this.setLinksRow2();
        this.setLinksRow3();
        this.setLinksRow4();
        this.setChat();
    }

    setStatic() {
        this.objects.add({
            base: this.resources.items.fitnessStaticBase.scene,
            collision: this.resources.items.fitnessStaticCollision.scene,
            floorShadowTexture:
                this.resources.items.fitnessStaticFloorShadowTexture,
            offset: new THREE.Vector3(this.x - 30, this.y - 10, 0),
            mass: 0,
        });
    }

    setLinksRow1() {
        // Set up
        this.links = {};
        this.links.x = -28.5;
        this.links.y = -5.5;
        this.links.halfExtents = {};
        this.links.halfExtents.x = 0.9;
        this.links.halfExtents.y = 0.9;
        this.links.distanceBetween = 2.8;
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1;
        this.links.labelGeometry = new THREE.PlaneBufferGeometry(
            this.links.labelWidth,
            this.links.labelWidth * 0.25,
            1,
            1
        );
        this.links.labelOffset = -1.4;
        this.links.items = [];

        this.links.container = new THREE.Object3D();
        this.links.container.matrixAutoUpdate = false;
        this.container.add(this.links.container);

        // Options
        this.links.options = [
            {
                href: "http://localhost:3000/dumbel",
                labelTexture: this.resources.items.dumbelLabelTexture,
            },
            {
                href: "http://localhost:3000/dumbel",
                labelTexture: this.resources.items.dumbelLabelTexture,
            },
            {
                href: "http://localhost:3000/skilltool",
                labelTexture: this.resources.items.skillToolsLabelTexture,
            },
            {
                href: "http://localhost:3000/skilltool",
                labelTexture: this.resources.items.skillToolsLabelTexture,
            },
            {
                href: "http://localhost:3000/skilltool",
                labelTexture: this.resources.items.skillToolsLabelTexture,
            },
        ];

        // Create each link
        let i = 0;
        for (const _option of this.links.options) {
            // Set up
            const item = {};
            item.x = this.x + this.links.x + this.links.distanceBetween * i;
            item.y = this.y + this.links.y;
            item.href = _option.href;

            // Create area
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(
                    this.links.halfExtents.x,
                    this.links.halfExtents.y
                ),
            });
            item.area.on("interact", () => {
                window.open(_option.href, "_blank");
            });

            // Texture
            item.texture = _option.labelTexture;
            item.texture.magFilter = THREE.NearestFilter;
            item.texture.minFilter = THREE.LinearFilter;

            // Create label
            item.labelMesh = new THREE.Mesh(
                this.links.labelGeometry,
                new THREE.MeshBasicMaterial({
                    wireframe: false,
                    color: 0xffffff,
                    alphaMap: _option.labelTexture,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                })
            );
            item.labelMesh.position.x =
                item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x;
            item.labelMesh.position.y = item.y + this.links.labelOffset;
            item.labelMesh.matrixAutoUpdate = false;
            item.labelMesh.updateMatrix();
            this.links.container.add(item.labelMesh);

            // Save
            this.links.items.push(item);

            i++;
        }
    }
    setChat() {
        // Set up
        this.links = {};
        this.links.x = 16;
        this.links.y = 1;
        this.links.halfExtents = {};
        this.links.halfExtents.x = 1.5;
        this.links.halfExtents.y = 1;
        this.links.distanceBetween = 2.8;
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1;
        this.links.labelGeometry = new THREE.PlaneBufferGeometry(
            this.links.labelWidth * 0.75,
            this.links.labelWidth * 0.2,
            1,
            1
        );
        this.links.labelOffset = -1.4;
        this.links.items = [];

        this.links.container = new THREE.Object3D();
        this.links.container.matrixAutoUpdate = false;
        this.container.add(this.links.container);

        // Options
        this.links.options = [
            {
                href: "http://localhost:3001/",
                labelTexture: this.resources.items.chatLabelTexture,
            },
        ];

        // Create each link
        let i = 0;
        for (const _option of this.links.options) {
            // Set up
            const item = {};
            item.x = this.x + this.links.x + this.links.distanceBetween * i;
            item.y = this.y + this.links.y;
            item.href = _option.href;

            // Create area
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(
                    this.links.halfExtents.x,
                    this.links.halfExtents.y
                ),
            });
            item.area.on("interact", () => {
                window.open(_option.href, "_blank");
            });

            // Texture
            item.texture = _option.labelTexture;
            item.texture.magFilter = THREE.NearestFilter;
            item.texture.minFilter = THREE.LinearFilter;

            // Create label
            item.labelMesh = new THREE.Mesh(
                this.links.labelGeometry,
                new THREE.MeshBasicMaterial({
                    wireframe: false,
                    color: 0xffffff,
                    alphaMap: _option.labelTexture,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                })
            );
            item.labelMesh.position.x =
                item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x;
            item.labelMesh.position.y = item.y + this.links.labelOffset + 1.4;
            item.labelMesh.matrixAutoUpdate = false;
            item.labelMesh.updateMatrix();
            this.links.container.add(item.labelMesh);

            // Save
            this.links.items.push(item);

            i++;
        }
    }
    
    setLinksRow2() {
        // Set up
        this.links = {};
        this.links.x = -28.5;
        this.links.y = -11.5;
        this.links.halfExtents = {};
        this.links.halfExtents.x = 0.9;
        this.links.halfExtents.y = 0.9;
        this.links.distanceBetween = 2.8;
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1;
        this.links.labelGeometry = new THREE.PlaneBufferGeometry(
            this.links.labelWidth,
            this.links.labelWidth * 0.25,
            1,
            1
        );
        this.links.labelOffset = -1.4;
        this.links.items = [];

        this.links.container = new THREE.Object3D();
        this.links.container.matrixAutoUpdate = false;
        this.container.add(this.links.container);

        // Options
        this.links.options = [
            {
                href: "http://localhost:3000/hyperextension",
                labelTexture: this.resources.items.hyperExtensionLabelTexture,
            },
            {
                href: "http://localhost:3000/hyperextension",
                labelTexture: this.resources.items.hyperExtensionLabelTexture,
            },
            {
                href: "http://localhost:3000/cycle",
                labelTexture: this.resources.items.cycleLabelTexture,
            },
            {
                href: "http://localhost:3000/cycle",
                labelTexture: this.resources.items.cycleLabelTexture,
            },
            {
                href: "http://localhost:3000/cycle",
                labelTexture: this.resources.items.cycleLabelTexture,
            },
        ];

        // Create each link
        let i = 0;
        for (const _option of this.links.options) {
            // Set up
            const item = {};
            item.x = this.x + this.links.x + this.links.distanceBetween * i;
            item.y = this.y + this.links.y;
            item.href = _option.href;

            // Create area
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(
                    this.links.halfExtents.x,
                    this.links.halfExtents.y
                ),
            });
            item.area.on("interact", () => {
                window.open(_option.href, "_blank");
            });

            // Texture
            item.texture = _option.labelTexture;
            item.texture.magFilter = THREE.NearestFilter;
            item.texture.minFilter = THREE.LinearFilter;

            // Create label
            item.labelMesh = new THREE.Mesh(
                this.links.labelGeometry,
                new THREE.MeshBasicMaterial({
                    wireframe: false,
                    color: 0xffffff,
                    alphaMap: _option.labelTexture,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                })
            );
            item.labelMesh.position.x =
                item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x;
            item.labelMesh.position.y = item.y + this.links.labelOffset;
            item.labelMesh.matrixAutoUpdate = false;
            item.labelMesh.updateMatrix();
            this.links.container.add(item.labelMesh);

            // Save
            this.links.items.push(item);

            i++;
        }
    }

    setLinksRow3() {
        // Set up
        this.links = {};
        this.links.x = -28.5;
        this.links.y = -17.5;
        this.links.halfExtents = {};
        this.links.halfExtents.x = 0.9;
        this.links.halfExtents.y = 0.9;
        this.links.distanceBetween = 2.8;
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1;
        this.links.labelGeometry = new THREE.PlaneBufferGeometry(
            this.links.labelWidth,
            this.links.labelWidth * 0.25,
            1,
            1
        );
        this.links.labelOffset = -1.4;
        this.links.items = [];

        this.links.container = new THREE.Object3D();
        this.links.container.matrixAutoUpdate = false;
        this.container.add(this.links.container);

        // Options
        this.links.options = [
            {
                href: "http://localhost:3000/vball",
                labelTexture: this.resources.items.volleyBallLabelTexture,
            },
            {
                href: "http://localhost:3000/bball",
                labelTexture: this.resources.items.basketBallLabelTexture,
            },
            {
                href: "http://localhost:3000/treadmill",
                labelTexture: this.resources.items.treadmillLabelTexture,
            },
            {
                href: "http://localhost:3000/treadmill",
                labelTexture: this.resources.items.treadmillLabelTexture,
            },
            {
                href: "http://localhost:3000/treadmill",
                labelTexture: this.resources.items.treadmillLabelTexture,
            },
        ];

        // Create each link
        let i = 0;
        for (const _option of this.links.options) {
            // Set up
            const item = {};
            item.x = this.x + this.links.x + this.links.distanceBetween * i;
            item.y = this.y + this.links.y;
            item.href = _option.href;

            // Create area
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(
                    this.links.halfExtents.x,
                    this.links.halfExtents.y
                ),
            });
            item.area.on("interact", () => {
                window.open(_option.href, "_blank");
            });

            // Texture
            item.texture = _option.labelTexture;
            item.texture.magFilter = THREE.NearestFilter;
            item.texture.minFilter = THREE.LinearFilter;

            // Create label
            item.labelMesh = new THREE.Mesh(
                this.links.labelGeometry,
                new THREE.MeshBasicMaterial({
                    wireframe: false,
                    color: 0xffffff,
                    alphaMap: _option.labelTexture,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                })
            );
            item.labelMesh.position.x =
                item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x;
            item.labelMesh.position.y = item.y + this.links.labelOffset;
            item.labelMesh.matrixAutoUpdate = false;
            item.labelMesh.updateMatrix();
            this.links.container.add(item.labelMesh);

            // Save
            this.links.items.push(item);

            i++;
        }
    }

    setLinksRow4() {
        // Set up
        this.links = {};
        this.links.x = -28.5;
        this.links.y = -23.5;
        this.links.halfExtents = {};
        this.links.halfExtents.x = 0.9;
        this.links.halfExtents.y = 0.9;
        this.links.distanceBetween = 2.8;
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1;
        this.links.labelGeometry = new THREE.PlaneBufferGeometry(
            this.links.labelWidth,
            this.links.labelWidth * 0.25,
            1,
            1
        );
        this.links.labelOffset = -1.4;
        this.links.items = [];

        this.links.container = new THREE.Object3D();
        this.links.container.matrixAutoUpdate = false;
        this.container.add(this.links.container);

        // Options
        this.links.options = [
            {
                href: "http://localhost:3000/skateboard",
                labelTexture: this.resources.items.skateboardLabelTexture,
            },
            {
                href: "http://localhost:3000/skateboard",
                labelTexture: this.resources.items.skateboardLabelTexture,
            },
            {
                href: "http://localhost:3000/gymbench",
                labelTexture: this.resources.items.benchLabelTexture,
            },
            {
                href: "http://localhost:3000/gymbench",
                labelTexture: this.resources.items.benchLabelTexture,
            },
            {
                href: "http://localhost:3000/gymbench",
                labelTexture: this.resources.items.benchLabelTexture,
            },
        ];

        // Create each link
        let i = 0;
        for (const _option of this.links.options) {
            // Set up
            const item = {};
            item.x = this.x + this.links.x + this.links.distanceBetween * i;
            item.y = this.y + this.links.y;
            item.href = _option.href;

            // Create area
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(
                    this.links.halfExtents.x,
                    this.links.halfExtents.y
                ),
            });
            item.area.on("interact", () => {
                window.open(_option.href, "_blank");
            });

            // Texture
            item.texture = _option.labelTexture;
            item.texture.magFilter = THREE.NearestFilter;
            item.texture.minFilter = THREE.LinearFilter;

            // Create label
            item.labelMesh = new THREE.Mesh(
                this.links.labelGeometry,
                new THREE.MeshBasicMaterial({
                    wireframe: false,
                    color: 0xffffff,
                    alphaMap: _option.labelTexture,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                })
            );
            item.labelMesh.position.x =
                item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x;
            item.labelMesh.position.y = item.y + this.links.labelOffset;
            item.labelMesh.matrixAutoUpdate = false;
            item.labelMesh.updateMatrix();
            this.links.container.add(item.labelMesh);

            // Save
            this.links.items.push(item);

            i++;
        }
    }
}
