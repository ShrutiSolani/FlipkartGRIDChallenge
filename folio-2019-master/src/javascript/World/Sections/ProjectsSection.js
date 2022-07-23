import * as THREE from 'three'
import Project from './Project'
import TweenLite from 'gsap/TweenLite'

import projectsThreejsJourneySlideASources from '../../../models/projects/Necklace1/neck.png'
import projectsThreejsJourneySlideBSources from '../../../models/projects/Necklace1/neck1.png'
import projectsThreejsJourneySlideCSources from '../../../models/projects/Necklace1/neck3.png'

import projectsMadboxSlideASources from '../../../models/projects/Dress7/1.png'
import projectsMadboxSlideBSources from '../../../models/projects/Dress7/3.png'
import projectsMadboxSlideCSources from '../../../models/projects/Dress7/dress.png'

import projectsScoutSlideBSources from '../../../models/projects/Dress7/6.png'
import projectsScoutSlideASources from '../../../models/projects/Dress7/shirt.png'

export default class ProjectsSection
{
    constructor(_options)
    {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.camera = _options.camera
        this.passes = _options.passes
        this.objects = _options.objects
        this.areas = _options.areas
        this.zones = _options.zones
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('projects')
            this.debugFolder.open()
        }

        // Set up
        this.items = []

        this.interDistance = 24
        this.positionRandomess = 5
        this.projectHalfWidth = 9

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setGeometries()
        this.setMeshes()
        this.setList()
        // this.setList2()
        this.setZone()

        // Add all project from the list
        for(const _options of this.list)
        {
            this.add(_options)
        }
    }

    setGeometries()
    {
        this.geometries = {}
        this.geometries.floor = new THREE.PlaneBufferGeometry(16, 8)
    }

    setMeshes()
    {
        this.meshes = {}
        this.meshes.boardPlane = this.resources.items.projectsBoardPlane.scene.children[0]
        this.meshes.areaLabel = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaOpenTexture }))
        this.meshes.areaLabel.matrixAutoUpdate = false
    }

    setList()
    { 
            this.list = [
            {
                name: 'Three.js Journey',
                imageSources:
                [
                    projectsThreejsJourneySlideASources,
                    projectsThreejsJourneySlideBSources,
                    projectsThreejsJourneySlideCSources,
                ],
                floorTexture: this.resources.items.projectsThreejsJourneyFloorTexture,
                link:
                [{
                    href: 'http://127.0.0.1:5000/accessories',
                    x: - 4.8,
                    y: - 4,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                }],
                distinctions:
                [
                    { type: 'fwa', x: 3.95, y: 4.15 }
                ]
            },
            {
                name: 'Madbox',
                imageSources:
                [
                    projectsMadboxSlideASources,
                    projectsMadboxSlideBSources,
                    projectsMadboxSlideCSources
                ],
                floorTexture: this.resources.items.projectsMadboxFloorTexture,
                link:
                [
                    {
                        href: 'http://127.0.0.1:3000/women1',
                        x: - 4.0,
                        y: - 4,
                        halfExtents:
                        {
                            x: 2.0,
                            y: 1.5
                        }
                    },
                    {
                        href: 'http://127.0.0.1:3000/women2',
                        x: 1,
                        y: -4,
                        halfExtents:
                        {
                            x: 2.0,
                            y: 1.5
                        }

                    },
                    {
                        href: 'http://127.0.0.1:3000/women3',
                        x: 6,
                        y: -4,
                        halfExtents:
                        {
                            x: 2.0,
                            y: 1.5
                        } 
                    }
                ],
                distinctions:
                [
                    { type: 'awwwards', x: 3.95, y: 4.15 },
                    { type: 'fwa', x: 5.6, y: 4.15 }
                ]
            },
            {
                name: 'Scout',
                imageSources:
                [
                    projectsScoutSlideASources,
                    projectsScoutSlideBSources,
                ],
                floorTexture: this.resources.items.projectsScoutFloorTexture,
                link:
                [
                    {
                        href: 'http://127.0.0.1:3000/men1',
                        x: - 4.0,
                        y: - 2.2,
                        halfExtents:
                        {
                            x: 2.0,
                            y: 1.5
                        }
                    },
                    {
                        href: 'http://127.0.0.1:3000/men2',
                        x: 1,
                        y: - 2.2,
                        halfExtents:
                        {
                            x: 2.0,
                            y: 1.5
                        }
                    }
                ],
                distinctions:
                [
                ]
            },
    
        ]
    }
 
    setZone()
    {
        const totalWidth = this.list.length * (this.interDistance / 2)

        const zone = this.zones.add({
            position: { x: this.x + totalWidth - this.projectHalfWidth - 6, y: this.y },
            halfExtents: { x: totalWidth, y: 12 },
            data: { cameraAngle: 'projects' }
        })

        zone.on('in', (_data) =>
        {
            this.camera.angle.set(_data.cameraAngle)
            TweenLite.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 2, { x: 0 })
            TweenLite.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 2, { y: 0 })
        })

        zone.on('out', () =>
        {
            this.camera.angle.set('default')
            TweenLite.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 2, { x: this.passes.horizontalBlurPass.strength })
            TweenLite.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 2, { y: this.passes.verticalBlurPass.strength })
        })
    }

    add(_options)
    {
        const x = this.x + this.items.length * this.interDistance
        let y = this.y
        if(this.items.length > 0)
        {
            y += (Math.random() - 0.5) * this.positionRandomess
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
            ..._options
        })

        this.container.add(project.container)
        this.items.push(project)
    }
}
