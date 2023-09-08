import React, { FC } from "react"
import { ThreejsArtifactViewer } from "./ThreejsArtifactViewer"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { CardMedia, IconButton } from "@mui/material"
import { Theme } from "@mui/material/styles"
import { SxProps } from "@mui/material"

export const ArtifactCardMedia: FC<{
  artifact: Artifact
  urlPath: string
  height: string
}> = ({ artifact, urlPath, height }) => {
  if (
    artifact.filename.endsWith(".stl") ||
    artifact.filename.endsWith(".3dm")
  ) {
    return (
      <ThreejsArtifactViewer
        src={urlPath}
        width={"100%"}
        height={height}
        hasGizmo={false}
        filetype={artifact.filename.split(".").pop()}
      />
    )
  } else if (artifact.mimetype.startsWith("audio")) {
    return (
      <audio controls>
        <source src={urlPath} type={artifact.mimetype} />
      </audio>
    )
  } else if (artifact.mimetype.startsWith("image")) {
    return (
      <CardMedia
        component="img"
        height={height}
        image={urlPath}
        alt={artifact.filename}
      />
    )
  }
  return <InsertDriveFileIcon sx={{ fontSize: 80 }} />
}

export type ArtifactButtonId = "3dmodel"

export const getArtifactButtons = (
  artifact: Artifact,
  trial: Trial,
  onClick: (id: ArtifactButtonId) => void,
  sx?: SxProps<Theme>
): JSX.Element[] => {
  const buttons: JSX.Element[] = []
  if (
    artifact.filename.endsWith(".stl") ||
    artifact.filename.endsWith(".3dm")
  ) {
    buttons.push(
      <IconButton
        aria-label="show artifact 3d model"
        size="small"
        color="inherit"
        sx={sx}
        onClick={() => onClick("3dmodel")}
      >
        <FullscreenIcon />
      </IconButton>
    )
  }
  return buttons
}
