# VoxPilot Design and Engineering Interconnection Architecture

## Purpose

The Chairman is the governing orchestration layer across design, analysis, engineering, visualization, software development, data, cloud, and enterprise systems.

It does not collapse every vendor into one unsafe credential pool. It separates:

1. Founder intent and approval
2. Chairman reasoning and routing
3. Secure vendor authentication
4. Artifact/model lineage
5. Transformation and interchange
6. Vendor execution
7. Validation and audit

## Connector families

The included catalog defines 35 major platform families, including Autodesk, Bentley, Dassault Systèmes, Siemens, PTC, Ansys, Altair, MathWorks, Hexagon, Trimble, Esri, NVIDIA Omniverse, Unity, Unreal Engine, Blender, Adobe, Figma, Miro, Microsoft, Google, GitHub, GitLab, Atlassian, Slack, Salesforce, ServiceNow, SAP, Oracle, AWS, Azure, Google Cloud, Snowflake, Databricks, OpenAI, and Anthropic.

## Autodesk control plane

Autodesk is treated as a first-class design execution plane:

- Data Management for project files and versions
- Model Derivative for translation, viewing, thumbnails, hierarchy, geometry and metadata extraction
- Automation for headless AutoCAD, Revit, Inventor, Fusion and 3ds Max work
- Viewer for browser-based model review
- Parameters and data models for structured engineering information
- Reality Capture for spatial source data

## Neutral exchange fabric

The Chairman routes artifacts through fit-for-purpose neutral formats:

- BIM: IFC
- Mechanical CAD: STEP, IGES, Parasolid, JT
- Realtime/digital twin: USD, glTF, FBX, Datasmith
- 2D engineering: DWG, DXF, PDF, SVG
- Geospatial: GeoJSON, KML, GeoTIFF, LAS, E57
- Analysis/data: CSV, JSON, HDF5, Parquet, FMU
- Documents: DOCX, XLSX, PPTX, PDF

## Security rule

The static iPhone PWA stores no vendor client secret in repository code. Connectors requiring confidential credentials are marked `server-required` and must later run through a secure GitHub-hosted or vendor-hosted backend. The app can define, plan, approve and audit those integrations now without falsely claiming that external accounts are connected.
