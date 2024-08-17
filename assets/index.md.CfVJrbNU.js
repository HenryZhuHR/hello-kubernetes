import{_ as s,c as i,o as a,a3 as n}from"./chunks/framework.7kCWGuEV.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),l={name:"index.md"},h=n(`<h2 id="kubernetes-hello-world" tabindex="-1">Kubernetes Hello World <a class="header-anchor" href="#kubernetes-hello-world" aria-label="Permalink to &quot;Kubernetes Hello World&quot;">​</a></h2><p>Pod 是我们将要创建的第一个 k8s 资源，也是可以在 Kubernetes 中创建和管理的、最小的可部署的计算单元。在了解 <code>pod</code> 和 <code>container</code> 的区别之前，我们可以先创建一个简单的 pod 试试，</p><p>创建一个 <code>nginx.yaml</code> 文件，内容如下：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># nginx.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 指定API版本</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Pod</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         # 指定资源类型</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx-pod</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 指定Pod的名称</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  containers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 容器列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx-container</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 容器名称</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # 容器镜像</span></span></code></pre></div><p>通过执行 <code>kubectl apply</code> 命令来创建 Pod，接着通过 <code>kubectl get pods</code> 来查看 pod 是否正常启动，最后通过 <code>kubectl port-forward</code> 命令将 pod 默认的 <code>80</code> 端口映射到本机的 <code>4000</code> 端口，通过「浏览器」或「打开终端窗使用口 curl 」访问 <code>localhost:4000</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apply</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx.yaml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 创建 Pod</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># pod/nginx-pod created</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pods</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 查看 Pod 状态，此时可能还在创建中</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># NAME        READY   STATUS              RESTARTS   AGE</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># nginx-pod   0/1     ContainerCreating   0          4s</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pods</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 查看 Pod 状态，创建完成</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># NAME        READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># nginx-pod   1/1     Running   0          62s</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> port-forward</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx-pod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 4000:80</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 将 Pod 的 80 端口映射到本地的 4000 端口</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Forwarding from 127.0.0.1:4000 -&gt; 80</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Forwarding from [::1]:4000 -&gt; 80</span></span></code></pre></div><p>可以通过 <code>kubectl exec -it</code> 命令进入 Pod 内容器的终端，并配置 nginx 的默认页面，最后通过「浏览器」或「打开终端窗使用口 curl 」访问 <code>localhost:4000</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx-pod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /bin/bash</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 容器内终端</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># root@nginx-pod:/#</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello kubernetes by nginx!&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> port-forward</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx-pod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 4000:80</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exit</span></span></code></pre></div><h2 id="helm-包管理" tabindex="-1">Helm 包管理 <a class="header-anchor" href="#helm-包管理" aria-label="Permalink to &quot;Helm 包管理&quot;">​</a></h2><h2 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h2><h3 id="业务升级流程" tabindex="-1">业务升级流程 <a class="header-anchor" href="#业务升级流程" aria-label="Permalink to &quot;业务升级流程&quot;">​</a></h3><p>做一些环境变量</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> NAMESPACE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     # 命名空间 \`kubectl get ns\` 获取</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> REPO_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     # 仓库名   \`helm repo list\` 获取</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CHART_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # chart 包名</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CHART_VERSION</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # chart 版本</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> INFO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;  - [INFO] \\033[00;32m\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\\033[0m&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;NAMESPACE:  \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NAMESPACE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DEFAULT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;REPO_NAME:  \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">REPO_NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DEFAULT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;CHART_NAME: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CHART_NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DEFAULT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&quot;</span></span></code></pre></div><p>获取 helm 包</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${REPO_NAME} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repo-ur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">l</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 添加 helm 仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                        # 查看 helm 仓库列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                      # 更新 helm 仓库</span></span></code></pre></div><p>下载 helm 包（可指定版本）</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${REPO_NAME}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${CHART_NAME} [--version \${CHART_VERSION} </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">]</span></span></code></pre></div><p>解压并进入 helm 包目录</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xvf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.tgz</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span></span></code></pre></div><p>查看在线的 pod</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pods</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${NAMESPACE}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pods</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${NAMESPACE} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 记录下 pod 的 id</span></span></code></pre></div><p>获取在线 pod 的配置文件，保存在当前目录</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">POD_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxxx&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> values</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${NAMESPACE} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.values.yaml</span></span></code></pre></div><p>使用保存的配置文件，更新 helm 包</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># helm upgrade [RELEASE] [CHART] [VERSION] [flags]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upgrade</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME} </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${NAMESPACE} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.values.yaml</span></span></code></pre></div><p>查看更新后的 pod</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pods</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${NAMESPACE} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span></span></code></pre></div><p>如果产生报错，需要根据日志信息进行排查，可以通过 <code>kubectl logs</code> 命令查看 pod 的日志信息</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">POD_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxxx&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # id 是新 pod 的 id</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> logs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CHART_NAME}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${POD_ID} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${NAMESPACE}</span></span></code></pre></div><h2 id="资料" tabindex="-1">资料 <a class="header-anchor" href="#资料" aria-label="Permalink to &quot;资料&quot;">​</a></h2><ul><li><a href="https://github.com/guangzhengli/k8s-tutorials" target="_blank" rel="noreferrer">Kubernetes Tutorials ｜ k8s 教程</a>, <a href="https://k8s-tutorials.pages.dev" target="_blank" rel="noreferrer">Online Pages</a></li></ul>`,33),t=[h];function p(e,k,d,r,g,E){return a(),i("div",null,t)}const c=s(l,[["render",p]]);export{o as __pageData,c as default};
