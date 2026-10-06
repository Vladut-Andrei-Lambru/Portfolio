export type CodeExample = {
  title: string;
  code: string;
  explanation: string;
  source: string;
};

// Excerpts from the linked project revisions. Keep the source line links with them.
export const codeExamples: Record<string, CodeExample[]> = {
  "tiny-spider-tiny-home": [
    {
      "title": "Movement relative to the current surface",
      "code": "Vector3 camForward = Vector3.ProjectOnPlane(cameraTransform.forward, _surfaceNormal).normalized;\nVector3 camRight   = Vector3.ProjectOnPlane(cameraTransform.right, _surfaceNormal).normalized;\nVector3 moveDir    = (camForward * v + camRight * h).normalized;\n\n// Preserve the “vertical” component along surface normal\nVector3 normalVel = Vector3.Project(_rb.linearVelocity, _surfaceNormal);\n\nVector3 desiredVelocity = moveDir * speed + normalVel;",
      "explanation": "Camera directions are projected onto the detected surface, so the same input works on floors, walls and ceilings. The velocity along the surface normal is preserved instead of being overwritten by walking input.",
      "source": "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home/blob/ec18bec7372c8cfd07308e26628c0f86076ba704/Year%201%20Project%203/Assets/Code/Movement/SpiderMovement.cs#L126-L133"
    },
    {
      "title": "Camera collision without camera roll",
      "code": "Quaternion camRot = Quaternion.Euler(_rotationY, _rotationX, 0);\n\n// Pivot using spider orientation\nVector3 pivot = spiderModel != null ? spiderModel.position : target.position;\nVector3 upVector = spiderModel != null ? spiderModel.up : Vector3.up;\n\n// Desired camera position\nVector3 desiredPos = pivot - (camRot * Vector3.forward * distance) + (upVector * heightOffset);\n\n// Collision check\nVector3 rayStart = pivot + upVector * heightOffset;\nif (Physics.Linecast(rayStart, desiredPos, out RaycastHit hit, collisionMask))\n{\n    desiredPos = hit.point + hit.normal * 0.1f;\n}\n\ntransform.position = desiredPos;\ntransform.rotation = camRot;",
      "explanation": "The orbit rotation uses zero roll even when the spider turns onto another surface. A line cast checks the route to the desired camera position and moves the camera in front of an obstruction. The spider’s up direction still offsets the pivot.",
      "source": "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home/blob/ec18bec7372c8cfd07308e26628c0f86076ba704/Year%201%20Project%203/Assets/Code/CameraController.cs#L77-L94"
    }
  ],
  "virtual-life-support": [
    {
      "title": "Unlocking mechanics from prerequisites",
      "code": "for (int i = 0; i < s.requiredFlags.Count; i++)\n{\n    string req = Normalize(s.requiredFlags[i]);\n    if (string.IsNullOrEmpty(req)) continue;\n\n    if (!_flags.Contains(req))\n        return false;\n}\nreturn true;",
      "explanation": "A step unlocks only when its configured prerequisite flags exist. This lets the scene connect CPR, requests and AED interactions through requirements. Order comes from those configured dependencies; the director does not enforce a fixed sequence by list position alone.",
      "source": "https://github.com/Vladut-Andrei-Lambru/VRLifeSupport-Block2/blob/2d56684f8d787ef5353567177a921f0b8cb9556f/Assets/Scripts/Progressing%20System/ScenarioProgress.cs#L139-L147"
    }
  ],
  "makers-fair": [
    {
      "title": "Keeping connected planks together while grabbed",
      "code": "void FixedUpdate()\n{\n    if (_leader != null && _rb != null && _rb.isKinematic)\n    {\n        Vector3 targetPos = _leader.transform.TransformPoint(_localPos);\n        Quaternion targetRot = _leader.transform.rotation * _localRot;\n        \n        _rb.MovePosition(targetPos);\n        _rb.MoveRotation(targetRot);\n    }\n}",
      "explanation": "While a group is grabbed, its followers are kinematic and keep their stored position and rotation relative to the leader. Moving them with Rigidbody methods avoids having the joint solver fight rapid hand movement. Releasing the group restores dynamic bodies and rebuilds its joints.",
      "source": "https://github.com/Vladut-Andrei-Lambru/Makers-Fair/blob/c66e7bb9712783b88aa38455e2c91fce6929a493/My%20project/Assets/Scripts/PlanksLinking/PlankGroupSync.cs#L44-L54"
    }
  ],
  "no-click-sherlock": [
    {
      "title": "Dialogue choices that change later mechanics",
      "code": "// Apply outcomes\nif (gameState != null)\n{\n    if (choiceData.affectsPlatforms)\n        gameState.platformGlitchMode = isA ? choiceData.platformResultIfA : choiceData.platformResultIfB;\n\n    if (choiceData.affectsPopups)\n        gameState.popupMode = isA ? choiceData.popupResultIfA : choiceData.popupResultIfB;\n}\n\nchoiceStep = ChoiceStep.NpcFeedback;",
      "explanation": "Choices update a shared GameStateSO rather than directly controlling a minigame scene. Separate systems read the platform and popup modes later, connecting the conversation to gameplay while keeping the dialogue UI independent of each challenge.",
      "source": "https://github.com/Vladut-Andrei-Lambru/CyberSecurity-InfraRED/blob/def1c157cdd9f79d0c3e18d8b4535af5e76d864e/CyberSecuirty-InfraRED/Assets/MainGame/Assets_MainGame/NPCs/Scripts/DialogueUI.cs#L239-L249"
    }
  ]
};

