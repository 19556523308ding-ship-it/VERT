# 关于这个仓库（中文镜像说明）

本仓库是 [VERT](https://github.com/VERT-sh/VERT)（AGPL-3.0）的完整导入镜像，包含上游全部提交历史。我们在此基础上做了少量修改，并部署了一个中文镜像站：

- **站点**：https://convert.getpicforge.com （默认简体中文界面，文件在浏览器本地转换、不上传服务器）
- **联系**：support@getpicforge.com

## 相对上游的修改

1. **大体积 WASM 远程加载**：Cloudflare Pages 有 25MB 单文件上限，上游的 `ffmpeg-core.wasm`（约 31–32MB）与 `pandoc.wasm`（约 56MB）无法放入 Pages 构建产物。修改后这几个文件改从外部 CDN（`wasm.getpicforge.com/v1/`，Cloudflare R2）按 URL 加载：
   - 新增构建期变量 `PUB_WASM_CDN`（见 `src/env.ts`）与 `src/lib/util/wasm-cdn.ts`；
   - `src/lib/converters/ffmpeg/ffmpeg.base.svelte.ts`、`src/lib/converters/pandoc/pandoc.svelte.ts`、`src/lib/workers/spessasynth.ts` 中原先的 `?url` 本地导入改指向上述远程地址（多线程版 worker 仍内嵌打包）。
2. **默认语言**：首次访问默认简体中文（`src/routes/+layout.svelte`），用户在设置中改选后按其选择记忆。
3. **站点信息**：页脚去掉上游 Discord 入口；「源代码」链接指向本仓库；联系邮箱改为镜像站邮箱（`src/lib/util/consts.ts`）；`static/robots.txt`、`static/sitemap.xml` 改为镜像站域名。
4. **SEO 落地页**：`static/` 下新增 10 个中文格式转换落地页（如 `static/wav-to-mp3/index.html`），由构建原样发布。
5. **构建配置**：部署时 `PUB_DISABLE_ALL_EXTERNAL_REQUESTS=true`（不调用官方 vertd 服务器，只做纯本地转换）、`PUB_WASM_CDN=https://wasm.getpicforge.com/v1`。

转换行为已逐项验证：镜像站导出的 MP3 与上游原版构建的产物逐字节一致（MD5 相同）。

上游项目与商标归其原作者所有；本镜像遵循 AGPL-3.0 发布，许可证见 `LICENSE`。
