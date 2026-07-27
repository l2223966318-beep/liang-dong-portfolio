# Task 2 报告：锁定 V3.2 数据与样式基础

## 实现内容

- 新增 `src/data/profile.ts`：导出带类型的 `profileFacts`、`capabilities`、`methodSteps` 与 `contact`，所有数值、中文文案、联系方式和简历路径均与简报一致。
- 新增 `src/data/profile.test.ts`：覆盖四项事实、四项能力、三步方法与已批准的联系方式。
- `src/data/portfolio.ts` 现在导入 Task 1 的只读 `productionMedia`；仅将三个项目媒体替换为 V3.2 路径，并为三份既有报告补充对应的 `cover` 路径。标题、角色、指标、行动、复盘与组织均未改动。
- `src/data/portfolio.test.ts` 新增 V3.2 项目媒体和研究封面映射契约。
- `src/styles/tokens.css` 已替换为简报锁定的 V3.2 token 集；为当前遗留 section CSS 加入三个最小兼容别名，全部映射到锁定 token。
- 新增 `src/styles/base.css`，承接 reset、body、共享 `.section-heading`（含其移动端规则）、focus、selection 与 reduced-motion 规则；仓库原本不存在 `.section-index` 规则，因此没有凭空新增。
- `src/styles/global.css` 的前两行现在依次导入 `tokens.css` 和 `base.css`，其余页面规则保持原处。

## TDD 记录

### RED：profile 数据

1. 先用 `apply_patch` 新建 `src/data/profile.test.ts`，此时没有 `src/data/profile.ts`。
2. 按简报直接执行 `pnpm test -- src/data/profile.test.ts` 时，PowerShell 因本机执行策略阻止 `pnpm.ps1`：`PSSecurityException`。
3. 改用 `pnpm.cmd test -- src/data/profile.test.ts` 后，本机全局 pnpm 为 9.0.0，与项目锁定的 10.13.1 不匹配。
4. 使用项目 Corepack 的等价命令 `corepack pnpm test -- src/data/profile.test.ts`，Vitest 如预期 RED：`Failed to resolve import "./profile"`，原因是 `src/data/profile.ts` 不存在；命令以 `ELIFECYCLE` 失败。

### GREEN：profile 数据

1. 仅新增简报给定的 `src/data/profile.ts` 实现。
2. `corepack pnpm test -- src/data/profile.test.ts`：通过，5 个测试文件、10 个测试通过。

### RED：V3.2 媒体映射

1. 先在 `src/data/portfolio.test.ts` 写入 V3.2 项目媒体与研究封面预期路径。
2. `corepack pnpm test -- src/data/portfolio.test.ts`：如预期失败。接收值仍为旧的 `/assets/case-*.webp`，而预期为 `/assets/v32/project-*.webp`。

### GREEN：V3.2 媒体映射

1. 仅在 `portfolio.ts` 导入 `productionMedia`，并替换项目 `media` 与报告 `cover` 路径。
2. `corepack pnpm test -- src/data/portfolio.test.ts`：通过，5 个测试文件、11 个测试通过。

## 最终验证

```text
corepack pnpm test -- src/data/profile.test.ts src/data/portfolio.test.ts
Test Files  5 passed (5)
Tests       11 passed (11)

corepack pnpm build
tsc -b && vite build
✓ 46 modules transformed.
✓ built in 1.42s
```

说明：项目的 `vitest run -- <path...>` 仍会发现并运行全套测试；指定的两个数据测试均在通过列表中。由于 PowerShell 的执行策略和全局 pnpm 版本不匹配，以上使用 Corepack 调用项目声明的 pnpm 10.13.1。

## 文件清单

新增：

- `src/data/profile.ts`
- `src/data/profile.test.ts`
- `src/styles/base.css`
- `.superpowers/sdd/2026-07-27-portfolio-v32-redesign-implementation/task-2-report.md`

修改：

- `src/data/portfolio.ts`
- `src/data/portfolio.test.ts`
- `src/styles/tokens.css`
- `src/styles/global.css`

## 自检

- 已确认项目数据 diff 只变更媒体字段，并新增报告封面字段；既有标题、角色、指标、行动、复盘和组织保持不变。
- 已确认所有新增资源路径来自 Task 1 的 `productionMedia`，未修改 Task 1 产物。
- 已确认 `global.css` 顶部导入顺序为 `tokens.css`、`base.css`。
- 已运行 `git diff --check`，无空白错误。
- 已通过 TypeScript 与 Vite 生产构建。
- 通过 `rg` 精确比对变量引用和 token 声明：缺失项仅为 `--line-dark`、`--line-light` 与 `--muted`。已分别映射为 `var(--hairline)`、基于 `var(--paper)` 的 22% `color-mix()` 和 `var(--silver)`；没有恢复任何旧色值。

## 问题 / 顾虑

- 为保持顺序任务间站点可运行，已加入带注释的临时兼容别名。后续 section CSS 完成 V3.2 token 迁移后，应删除这三个别名。
- 新增的 `Report.cover` 是后续 `ResearchIndex` 消费 V3.2 独立研究封面的数据接口；本 Task 2 未提前修改页面组件，符合任务边界。
