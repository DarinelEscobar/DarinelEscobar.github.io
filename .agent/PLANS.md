# Repository ExecPlan Standard

Use a self-contained ExecPlan in `.agent/execplans/` for complex work. Ground it in the repository and preserve unrelated work. Milestones are vertical slices with implementation, tests, local validation, documentation, acceptance criteria and completion gates. `depends_on` is the source of dependency truth. Keep progress, discoveries, decisions and outcomes current; mark a milestone complete only after its checks and acceptance criteria pass. Sequential execution is the default and parallel eligibility does not authorize delegation.

Planning alone does not authorize implementation. Approval of a plan authorizes its implementation, but does not authorize commits, pushes, merges or deployments.
