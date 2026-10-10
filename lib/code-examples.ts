export type CodeExample = {
  title: string;
  code: string;
  explanation: string;
  source: string;
};

export const codeExamples: Record<string, CodeExample[]> = {
  "tiny-spider-tiny-home": [
    {
      title: "Camera-relative movement on any surface",
      code: `float h = Input.GetAxisRaw("Horizontal");
float v = Input.GetAxisRaw("Vertical");

Vector3 camForward = Vector3.ProjectOnPlane(cameraTransform.forward, _surfaceNormal).normalized;
Vector3 camRight   = Vector3.ProjectOnPlane(cameraTransform.right, _surfaceNormal).normalized;
Vector3 moveDir    = (camForward * v + camRight * h).normalized;

Vector3 normalVel = Vector3.Project(_rb.linearVelocity, _surfaceNormal);

Vector3 desiredVelocity = moveDir * speed + normalVel;`,
      explanation:
        "Camera directions are projected onto the current surface normal. Input therefore follows the floor, wall or ceiling, while the existing velocity along that normal is preserved.",
      source:
        "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home/blob/ec18bec7372c8cfd07308e26628c0f86076ba704/Year%201%20Project%203/Assets/Code/Movement/SpiderMovement.cs#L122-L133",
    },
    {
      title: "Camera collision without camera roll",
      code: `Quaternion camRot = Quaternion.Euler(_rotationY, _rotationX, 0);

Vector3 pivot = spiderModel != null ? spiderModel.position : target.position;
Vector3 upVector = spiderModel != null ? spiderModel.up : Vector3.up;

Vector3 desiredPos = pivot - (camRot * Vector3.forward * distance) + (upVector * heightOffset);

Vector3 rayStart = pivot + upVector * heightOffset;
if (Physics.Linecast(rayStart, desiredPos, out RaycastHit hit, collisionMask))
{
    desiredPos = hit.point + hit.normal * 0.1f;
}

transform.position = desiredPos;
transform.rotation = camRot;`,
      explanation:
        "The camera uses zero roll independently of the spider's orientation. A line cast moves it in front of furniture blocking the view, while the spider's up direction offsets the pivot.",
      source:
        "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home/blob/ec18bec7372c8cfd07308e26628c0f86076ba704/Year%201%20Project%203/Assets/Code/CameraController.cs#L77-L94",
    },
    {
      title: "Handing movement over to the web swing",
      code: `private void StartGrapple()
{
    Ray ray = new Ray(cameraTransform.position, cameraTransform.forward);
    if (Physics.Raycast(ray, out RaycastHit hit, maxGrappleDistance, grappleMask))
    {
        _grapplePoint = hit.point;
        _isGrappling = true;

        _springJoint = gameObject.AddComponent<SpringJoint>();
        _springJoint.autoConfigureConnectedAnchor = false;
        _springJoint.connectedAnchor = _grapplePoint;

        float distanceFromPoint = Vector3.Distance(transform.position, _grapplePoint);

        _springJoint.maxDistance = distanceFromPoint * 0.8f;
        _springJoint.minDistance = distanceFromPoint * 0.25f;
        _springJoint.spring = jointSpring;
        _springJoint.damper = jointDamping;
        _springJoint.massScale = jointMassScale;

        _lineRenderer.enabled = true;
        _lineRenderer.SetPosition(0, transform.position);
        _lineRenderer.SetPosition(1, _grapplePoint);

        var spiderMove = GetComponent<SpiderMovement>();
        if (spiderMove != null)
        {
            spiderMove.disableMovement = true;
        }
    }
}`,
      explanation:
        "A camera ray selects the attachment point and a SpringJoint supplies the swing. Crawling is disabled while attached so its velocity and gravity code do not compete with the joint.",
      source:
        "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home/blob/ec18bec7372c8cfd07308e26628c0f86076ba704/Year%201%20Project%203/Assets/Code/Interactions/GrappleHook.cs#L73-L107",
    },
  ],

  "virtual-life-support": [
    {
      title: "Unlocking interactions from prerequisite flags",
      code: `private bool IsStepReadyToUnlock(Step s)
{
    if (s.requiredFlags == null || s.requiredFlags.Count == 0)
        return false;

    for (int i = 0; i < s.requiredFlags.Count; i++)
    {
        string req = Normalize(s.requiredFlags[i]);
        if (string.IsNullOrEmpty(req)) continue;

        if (!_flags.Contains(req))
            return false;
    }
    return true;
}`,
      explanation:
        "Each step checks its configured prerequisite flags before unlocking. CPR, AED and bystander interactions can share the director without directly referencing one another. An empty prerequisite list does not unlock a step.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/VRLifeSupport-Block2/blob/2e1e0f20853f28989bb3d6b2ece509b7d9718d1b/Assets/Scripts/Progressing%20System/ScenarioProgress.cs#L134-L148",
    },
    {
      title: "Chest recoil with a damped spring",
      code: `public void UpdatePhysics(float dt)
{
    if (chestPlate == null) return;

    float springForce = -_currentCompression * chestStiffness;
    _velocity += springForce * dt;

    float dampingFactor = Mathf.Exp(-chestDamping * dt);
    _velocity *= dampingFactor;

    _currentCompression += _velocity * dt;
    _currentCompression = Mathf.Clamp(_currentCompression, 0f, maxCompression);

    chestPlate.localPosition = _chestOriginalLocalPos - Vector3.up * _currentCompression;

    Vector3 localOffset = -Vector3.up * _currentCompression;
    if (chestPlate.parent != null)
        ChestWorldOffset = chestPlate.parent.TransformVector(localOffset);
    else
        ChestWorldOffset = localOffset;
}`,
      explanation:
        "Compression returns toward its resting position using a spring force and exponential damping based on elapsed time. The result is clamped and applied in local space, keeping chest movement separate from scenario progression.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/VRLifeSupport-Block2/blob/2e1e0f20853f28989bb3d6b2ece509b7d9718d1b/Assets/Scripts/CPR/CprChestController.cs#L93-L117",
    },
    {
      title: "Arming a two-hand gesture before activation",
      code: `// Arm the gesture only after holding stop pose briefly (reduces false triggers)
if (stopPose)
    _armTimer += Time.deltaTime;
else
    _armTimer = 0f;

bool armed = _armTimer >= armHoldSeconds;
if (!armed)
    return;

// Push trigger: both hands forward fast, OR average is fast (configurable)
bool bothPush = leftForwardSpeed > pushSpeed && rightForwardSpeed > pushSpeed;
bool avgPush = allowAverageSpeedTrigger && avgForwardSpeed > pushSpeed;

if (bothPush || avgPush)
{
    _cooldown = cooldownSeconds;
    _armTimer = 0f;
    onStopAndPush?.Invoke();
}`,
      source:
        "https://github.com/Vladut-Andrei-Lambru/VRLifeSupport-Block2/blob/2e1e0f20853f28989bb3d6b2ece509b7d9718d1b/Assets/Scripts/Hand%20Gesture/TwoHandPush.cs#L124-L143",
      explanation:
        "The validated stop pose must be held for the configured duration before a push can activate. Detection then accepts either both hands exceeding the forward-speed threshold or, when enabled, their average speed. Activation emits an event and starts a cooldown, so scene responses can be configured separately.",
    },
  ],

  "makers-fair": [
    {
      title: "Following a grabbed construction in local space",
      code: `internal void MarkFollow(PlankGroupGrabSync lead)
{
    _leader = lead;
    if (lead != null)
    {
        _localPos = lead.transform.InverseTransformPoint(transform.position);
        _localRot = Quaternion.Inverse(lead.transform.rotation) * transform.rotation;
    }
}

void FixedUpdate()
{
    if (_leader != null && _rb != null && _rb.isKinematic)
    {
        Vector3 targetPos = _leader.transform.TransformPoint(_localPos);
        Quaternion targetRot = _leader.transform.rotation * _localRot;

        _rb.MovePosition(targetPos);
        _rb.MoveRotation(targetRot);
    }
}`,
      explanation:
        "Followers store their position and rotation relative to the grabbed leader. During physics updates, kinematic bodies follow those offsets through Rigidbody movement methods.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/Makers-Fair/blob/24cea6f8fd7ce6ddf15b44997a4b81c2d823935c/My%20project/Assets/Scripts/PlanksLinking/PlankGroupSync.cs#L34-L54",
    },
    {
      title: "Restoring construction physics after release",
      code: `public void ReleaseKinematic()
{
    foreach (var rb in planks)
    {
        rb.isKinematic = false;
        rb.constraints = RigidbodyConstraints.None;
        rb.useGravity = true;
        rb.linearDamping = 0f;
        rb.angularDamping = 0.05f;
        rb.GetComponent<PlankGroupGrabSync>()?.MarkFollow(null);
    }

    WeldAll();
}`,
      explanation:
        "Releasing a group restores dynamic simulation, gravity and damping, clears its follower references and rebuilds the joints. This is the handoff from controlled VR manipulation back to a physical cart.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/Makers-Fair/blob/24cea6f8fd7ce6ddf15b44997a4b81c2d823935c/My%20project/Assets/Scripts/PlanksLinking/PlankGroup.cs#L126-L139",
    },
  ],

  "no-click-sherlock": [
    {
      title: "Dialogue decisions that affect later challenges",
      code: `if (mode != Mode.Choice) return;
if (choiceData == null) return;
if (choiceStep != ChoiceStep.Choosing) return;

if (gameState != null)
{
    if (choiceData.affectsPlatforms)
        gameState.platformGlitchMode = isA ? choiceData.platformResultIfA : choiceData.platformResultIfB;

    if (choiceData.affectsPopups)
        gameState.popupMode = isA ? choiceData.popupResultIfA : choiceData.popupResultIfB;
}

choiceStep = ChoiceStep.NpcFeedback;`,
      explanation:
        "Choice handling checks the dialogue state before updating the shared platform and popup settings. Later gameplay systems read those settings, connecting the conversation to the challenges.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/CyberSecurity-InfraRED/blob/faeeaad898e0699c1df08233119cf31003f5f014/CyberSecuirty-InfraRED/Assets/MainGame/Assets_MainGame/NPCs/Scripts/DialogueUI.cs#L235-L249",
    },
    {
      title: "Saving the return point before changing scenes",
      code: `public void FinishMinigame()
{
    Time.timeScale = 1f;
    if (finishing) return;
    finishing = true;

    SaveManager.MarkMinigameCompleted(minigameId);

    int targetScene = goToNextScene ? nextSceneBuildIndex : mainSceneBuildIndex;

    if (!goToNextScene)
    {
        SaveManager.SetLastMainSpawn(returnSpawnId);
        SaveManager.SetSkipMainIntro(true);

        if (!string.IsNullOrWhiteSpace(mainEventId))
            SaveManager.EnqueueMainEvent(mainEventId);
    }

    if (cleanupMinigameDontDestroyOnLoad)
        CleanupMinigameDDOL();

    if (!playCutsceneBeforeLoad || cutsceneClip == null || CutsceneSystem.Instance == null)
    {
        SceneManager.LoadScene(targetScene, LoadSceneMode.Single);
        return;
    }

    CutsceneSystem.Instance.PlayAndLoadScene(cutsceneClip, targetScene);
}`,
      explanation:
        "Completion is guarded against repeated calls. Before the later scene transition, the system records the completed minigame, return spawn and optional story event so the narrative can resume at the right point.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/CyberSecurity-InfraRED/blob/faeeaad898e0699c1df08233119cf31003f5f014/CyberSecuirty-InfraRED/Assets/MainGame/Scripts_MainGame/SaveSystem/MinigameFinish.cs#L36-L70",
    },
  ],

  "combat-progression": [
    {
      title: "XP carry-over and level-up events",
      code: `public void AddXP(int amount)
{
    if (amount <= 0) return;

    CurrentXP += amount;

    while (CurrentXP >= xpPerLevel)
    {
        CurrentXP -= xpPerLevel;
        Level++;
        LevelUp?.Invoke(Level);
    }

    XPChanged?.Invoke(CurrentXP, xpPerLevel);
    RefreshUI();
}`,
      explanation:
        "The loop subtracts each completed level's XP requirement and keeps the remainder. A level-up event connects progression to upgrade selection, while XPChanged updates listeners with the remaining progress.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/FocusTrack/blob/eabf0dee4014c9378804d7974c6d414a9f7e4926/Assets/FPS/Scripts/Progression/ProgressionManager.cs#L49-L64",
    },
    {
      title: "Applying movement and weapon upgrades in one place",
      code: `public void Apply(UpgradeId id)
{
    switch (id)
    {
        case UpgradeId.Dash:
            state.dashUnlocked = true;
            if (dash) dash.UnlockDash();
            break;

        case UpgradeId.DoubleJump:
            state.doubleJumpUnlocked = true;
            if (doubleJump) doubleJump.UnlockDoubleJump();
            break;

        case UpgradeId.KillSpeedBoost:
            state.killSpeedBoostUnlocked = true;
            if (killSpeed) killSpeed.UnlockAdrenaline();
            break;

        case UpgradeId.OverheatTier1:
            state.overheatTier = Mathf.Max(state.overheatTier, 1);
            overheatTuning?.ApplyTier(state.overheatTier);
            break;

        case UpgradeId.OverheatTier2:
            state.overheatTier = Mathf.Max(state.overheatTier, 2);
            overheatTuning?.ApplyTier(state.overheatTier);
            break;

        case UpgradeId.CritChance10:
            state.crit10Unlocked = true;
            if (critProvider)
            {
                critProvider.SetCrit(0.10f, 5.0f);
                critProvider.SetCritEnabled(true);
            }
            break;
    }

    hud?.OnUpgradeApplied(id);
}`,
      explanation:
        "Upgrade IDs connect menu choices to gameplay components and runtime unlock state. Weapon tiers use Mathf.Max to avoid downgrading an existing tier, and Critical Protocol enables a 10% chance with a five-times damage multiplier. The HUD is notified after application.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/FocusTrack/blob/eabf0dee4014c9378804d7974c6d414a9f7e4926/Assets/FPS/Scripts/Progression/UpgradeApplier.cs#L32-L74",
    },
    {
      title: "Directional dash with distance-based speed",
      code: `private void OnDashPerformed(InputAction.CallbackContext ctx)
{
    if (!_unlocked) return;

    float now = Time.unscaledTime;
    if (now < _nextDashTime) return;

    _nextDashTime = now + dashCooldown;
    _dashEndTime = now + dashTime;

    Vector3 move = _input != null ? _input.GetMoveInput() : Vector3.zero;
    Vector3 dir = move.sqrMagnitude > 0.01f ? transform.TransformVector(move).normalized : transform.forward;

    float dashSpeed = (dashTime <= 0.001f) ? dashDistance : (dashDistance / dashTime);
    _dashVelocity = dir * dashSpeed;

    if (cam) cam.fieldOfView = _baseFov + dashFovKick;

    Debug.Log("[Vladut Andrei] DASH START");
}`,
      explanation:
        "The dash checks its unlock and cooldown, chooses movement input or the player's forward direction, then calculates velocity from distance divided by duration. A field-of-view kick provides immediate feedback. The controller applies this velocity during the active dash.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/FocusTrack/blob/eabf0dee4014c9378804d7974c6d414a9f7e4926/Assets/FPS/Scripts/Progression/DashAbility.cs#L65-L86",
    },
    {
      title: "Weapon tiers calculated from captured base values",
      code: `CaptureBaseIfNeeded(w);

w.AmmoReloadRate = _baseReloadRate;
w.AmmoReloadDelay = _baseReloadDelay;

if (tier >= 1)
    w.AmmoReloadRate = _baseReloadRate * tier1ReloadRateMultiplier;

if (tier >= 2)
    w.AmmoReloadDelay = _baseReloadDelay * tier2ReloadDelayMultiplier;

w.AmmoReloadRate = Mathf.Max(minReloadRate, w.AmmoReloadRate);
w.AmmoReloadDelay = Mathf.Max(minReloadDelay, w.AmmoReloadDelay);`,
      explanation:
        "Each application starts from captured recovery values rather than multiplying already-upgraded values. Tier one changes recovery rate; tier two also changes recovery delay. Minimum values prevent invalid tuning. The surrounding method resolves the active runtime weapon first.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/FocusTrack/blob/eabf0dee4014c9378804d7974c6d414a9f7e4926/Assets/FPS/Scripts/Progression/WeaponOverheatTuning.cs#L61-L75",
    },
    {
      title: "Critical damage with separate HUD feedback",
      code: `public void TryApplyCrit(ref float damage, Vector3 hitPos)
{
    if (!critEnabled) return;
    if (chance <= 0f || multiplier <= 1f) return;

    if (UnityEngine.Random.value < chance)
    {
        damage *= multiplier;
        CritHappened?.Invoke(hitPos);
    }
}`,
      explanation:
        "The provider checks whether critical hits are enabled before rolling the configured chance. A successful roll changes damage by reference and publishes the hit position through an event for visual feedback.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/FocusTrack/blob/eabf0dee4014c9378804d7974c6d414a9f7e4926/Assets/FPS/Scripts/Progression/CritProvider.cs#L35-L46",
    },
  ],
  "time-rewind": [
    {
      title: "Recording transform and physics state",
      code: `USTRUCT(BlueprintType)
struct FRewindFrame
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadWrite)
    FTransform Transform;

    UPROPERTY(BlueprintReadWrite)
    FVector LinearVelocity = FVector::ZeroVector;

    UPROPERTY(BlueprintReadWrite)
    FVector AngularVelocity = FVector::ZeroVector;

    UPROPERTY(BlueprintReadWrite)
    bool bWasSimulatingPhysics = false;
};`,
      explanation:
        "Each snapshot stores position, rotation and scale through FTransform, together with linear velocity, angular velocity and physics simulation state. Saving these values together lets the rewind component manage both character movement and physics objects.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/TimeRewindUE5/blob/25afb38ada6a3586074c97758d3ceda21d1e99c9/Source/Elective/RewindTypes.h#L8-L28",
    },
    {
      title: "Sampling actor history at a configured interval",
      code: `if (bIsRecording && !bIsRewinding)
{
    RecordTimer += DeltaTime;

    while (RecordTimer >= RecordInterval)
    {
        RecordFrame();
        RecordTimer -= RecordInterval;
    }
}

if (bIsRewinding)
{
    DoRewindStep();
}`,
      explanation:
        "Recording accumulates elapsed time and captures snapshots when the configured interval is reached. Recording pauses during rewind, keeping playback separate from history capture. The loop handles accumulated sampling time, although multiple samples taken during one long game frame capture the current state rather than reconstructing intermediate positions.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/TimeRewindUE5/blob/25afb38ada6a3586074c97758d3ceda21d1e99c9/Source/Elective/RewindComponentCPP.cpp#L49-L64",
    },
    {
      title: "Consuming recorded snapshots in reverse order",
      code: `void URewindComponentCPP::DoRewindStep()
{
    AActor* Owner = GetOwner();
    if (!Owner)
    {
        return;
    }

    for (int32 i = 0; i < FramesPerRewindStep; i++)
    {
        if (StoredFrames.Num() == 0)
        {
            StopRewind();
            return;
        }

        const int32 LastIndex = StoredFrames.Num() - 1;
        const FRewindFrame Frame = StoredFrames[LastIndex];

        LastFrame = Frame;

        Owner->SetActorTransform(
            Frame.Transform,
            false,
            nullptr,
            ETeleportType::TeleportPhysics
        );

        StoredFrames.RemoveAt(LastIndex);
    }
}`,
      explanation:
        "Each playback step takes the newest snapshot, applies its transform and removes it from history. LastFrame retains the state needed when playback ends. Empty history stops rewind automatically. This recorded-path behaviour supports the final puzzle, where the cube must return along its previous route to reach another pressure plate. Playback currently consumes a configured number of snapshots per tick.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/TimeRewindUE5/blob/25afb38ada6a3586074c97758d3ceda21d1e99c9/Source/Elective/RewindComponentCPP.cpp#L147-L173",
    },
    {
      title: "Returning control to character movement and physics",
      code: `if (CachedCharacterMovement)
{
    CachedCharacterMovement->StopMovementImmediately();
    CachedCharacterMovement->SetMovementMode(MOVE_Walking);
}

if (CachedPrimitive)
{
    CachedPrimitive->SetWorldTransform(
        LastFrame.Transform,
        false,
        nullptr,
        ETeleportType::TeleportPhysics
    );

    if (LastFrame.bWasSimulatingPhysics)
    {
        CachedPrimitive->SetSimulatePhysics(true);
        CachedPrimitive->SetPhysicsLinearVelocity(
            LastFrame.LinearVelocity
        );
        CachedPrimitive->SetPhysicsAngularVelocityInDegrees(
            LastFrame.AngularVelocity
        );
        CachedPrimitive->WakeAllRigidBodies();
    }
}

OnRewindStoppedBP();`,
      explanation:
        "When rewind ends, the character returns to walking movement. A physics object is placed at the last applied transform and, if it was recorded as simulating physics, regains its saved velocities. The Blueprint event provides a separate place for object-specific behaviour and feedback. This excerpt shows the component's restoration logic; the test plan separately describes resetting cube velocity to prevent unwanted movement.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/TimeRewindUE5/blob/25afb38ada6a3586074c97758d3ceda21d1e99c9/Source/Elective/RewindComponentCPP.cpp#L187-L207",
    },
    {
      title: "Connecting the C++ mechanic to Blueprint gameplay",
      code: `UFUNCTION(BlueprintCallable, Category = "Rewind")
void StartRewind();

UFUNCTION(BlueprintCallable, Category = "Rewind")
void StopRewind();

UFUNCTION(BlueprintCallable, Category = "Rewind")
void ClearStoredFrames();

UFUNCTION(BlueprintPure, Category = "Rewind")
float GetStoredTimeSeconds() const;

UFUNCTION(BlueprintImplementableEvent, Category = "Rewind")
void OnRewindStartedBP();

UFUNCTION(BlueprintImplementableEvent, Category = "Rewind")
void OnRewindStoppedBP();`,
      explanation:
        "Blueprints can start and stop playback, clear old history and query estimated stored time. Clearing history supports the cube's new-throw behaviour, which prevents earlier positions from affecting its next rewind. Start and stop events let Blueprint logic handle sounds, trails and interaction responses while the C++ component remains responsible for recording and playback.",
      source:
        "https://github.com/Vladut-Andrei-Lambru/TimeRewindUE5/blob/25afb38ada6a3586074c97758d3ceda21d1e99c9/Source/Elective/RewindComponentCPP.h#L84-L101",
    },
  ],
};
