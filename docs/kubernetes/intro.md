---
outline: deep
---

## Kubernetes

### Kubernetes 简介

Kubernetes 的 logo 是一个舵手，因为英文单词 K 和 S 中间包含 8 个字母，所以简称 K8S， 是一个全新的基于容器技术的分布式架构领先方案，是谷歌严格保密十几年的秘密武器----Borg 系统的一个开源版本，于 2014 年 9 月发布第一个版本，2015年 7 月发布第一个正式版本。

Kubernetes 的本质是一组服务器集群，它可以在集群的每个节点上运行特定的程序，来对节点中的容器进行管理。目的是实现资源管理的自动化，主要提供了如下的主要功能：
- **自我修复**：一旦某一个容器崩溃，能够在1秒中左右迅速启动新的容器
- **弹性伸缩**：可以根据需要，自动对集群中正在运行的容器数量进行调整
- **服务发现**：服务可以通过自动发现的形式找到它所依赖的服务
- **负载均衡**：如果一个服务起动了多个容器，能够自动实现请求的负载均衡
- **版本回退**：如果发现新发布的程序版本有问题，可以立即回退到原来的版本
- **存储编排**：可以根据容器自身的需求自动创建存储卷

Kubernetes 解决的核心问题

- **服务发现和负载均衡**
  
    Kubernetes 可以使用 DNS 名称或自己的 IP 地址公开容器，如果到容器的流量很大，Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。

- **存储编排**
   
    Kubernetes 允许您自动挂载您选择的存储系统，例如本地存储、公共云提供商等。

- **自动部署和回滚**

    您可以使用 Kubernetes 描述已部署容器的所需状态，它可以以受控的速率将实际状态更改为所需状态。例如，您可以自动化 Kubernetes 来为您的部署创建新容器，删除现有容器并将它们的所有资源用于新容器。

- **自动二进制打包**

    Kubernetes 允许您指定每个容器所需 CPU 和内存（RAM）。当容器指定了资源请求时，Kubernetes 可以做出更好的决策来管理容器的资源。

- **自我修复**

    Kubernetes 重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器，并且在准备好服务之前不将其通告给客户端。

- **密钥与配置管理**

    Kubernetes 允许您存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。您可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。


### Kubernetes 架构

当部署完 Kubernetes，便拥有了一个完整的集群，Kubernetes 有两个核心概念：`Node` 和 `Pod`。

- `Node` 是 Kubernetes 集群中的一个节点（一组工作机器，可以是物理机或虚拟机），会运行容器化应用程序。每个集群至少有一个工作节点。
- `Pod` 是 Kubernetes 中最小的部署单元，是一个或多个容器的集合。工作节点会托管 Pod，而 Pod 就是作为应用负载的组件。 控制平面管理集群中的工作节点和 Pod。 在生产环境中，控制平面通常跨多台计算机运行， 一个集群通常运行多个节点，提供容错性和高可用性。

![Kubernetes 集群的组件](https://kubernetes.io/images/docs/components-of-kubernetes.svg)

Kubernetes 集群分为两部分
- 控制平面（Master 节点）：负责管理集群
- 数据平面（Node 节点）：负责运行应用程序


> [!NOTE]
> 在早期的 Kubernetes 文档中，「Master 节点」指的是集群中负责协调和管理其他节点（Worker 节点）的特殊节点。随着 Kubernetes 的发展和最佳实践的变化，「Master 节点」逐渐被「控制平面」所取代。

#### 控制平面

控制平面（Master 节点）组件会为集群做出全局决策，比如资源的调度。一个集群可以有一个或多个控制平面节点

作为管理集群状态的 Master 节点，它主要负责接收客户端的请求，安排容器的执行并且运行控制循环，将集群的状态向目标状态进行迁移。Master 节点内部由下面组件构成：

- **kube-apiserver**

    是 Kubernetes 控制平面的前端，负责公开了 Kubernetes API，负责处理接受请求的工作。资源操作的唯一入口，接收用户输入的命令，提供认证、授权、API注册和发现等机制


- **etcd**

    [etcd](https://etcd.io/docs/) 是一致且高可用的键值存储，用作 Kubernetes 所有集群数据的后台数据库

- **kube-scheduler**：

    负责资源 (Pods) 的调度，它会根据一些调度策略，将 Pod 调度到集群到合适的节点上

- **kube-controller-manager**

    负责运行控制器进程，维护集群的状态，比如程序部署安排、故障检测、自动扩展、滚动更新等。控制器是一种用于管理集群中的资源的控制器，如
    - 节点控制器（Node Controller）：负责在节点出现故障时进行通知和响应
    - 任务控制器（Job Controller）：监测代表一次性任务的 Job 对象，然后创建 Pod 来运行这些任务直至完成
    - 端点分片控制器（EndpointSlice controller）：填充端点分片（EndpointSlice）对象（以提供 Service 和 Pod 之间的链接）。
    - 服务账号控制器（ServiceAccount controller）：为新的命名空间创建默认的服务账号（ServiceAccount）。
    - 等等


#### 数据平面

节点组件会在每个节点上运行，负责维护运行的 Pod 并提供 Kubernetes 运行环境。

- **kubelet**

    kubelet 会在集群中每个节点（node）上运行。 它保证容器（containers）都运行在 Pod 中。

    kubelet 接收一组通过各类机制提供给它的 PodSpec，确保这些 PodSpec 中描述的容器处于运行状态且健康。 kubelet 不会管理不是由 Kubernetes 创建的容器。
    
    是 Kubernetes 的代理，负责维护容器的运行，监控容器的状态，同时与控制平面的 kube-apiserver 交互

    负责维护容器的生命周期，即通过控制docker，来创建、更新、销毁容器

- **kube-proxy**    

    kube-proxy 是集群中每个节点（node）上所运行的网络代理， 实现 Kubernetes 服务（Service） 概念的一部分。

    kube-proxy 维护节点上的一些网络规则， 这些网络规则会允许从集群内部或外部的网络会话与 Pod 进行网络通信。

    如果操作系统提供了可用的数据包过滤层，则 kube-proxy 会通过它来实现网络规则。 否则，kube-proxy 仅做流量转发。

    负责提供集群内部的服务发现和负载均衡

- **Container Runtime**

    这个基础组件使 Kubernetes 能够有效运行容器。 它负责管理 Kubernetes 环境中容器的执行和生命周期。
    
    Kubernetes 支持多种容器运行时，如 Docker、containerd、CRI-O 等


#### Kubernetes 组件调用

下面，以部署一个 nginx 服务来说明 kubernetes 系统各个组件调用关系：
1. 首先要明确，一旦 kubernetes 环境启动之后，master 和 node 都会将自身的信息存储到 etcd 数据库中；
2. 一个 nginx 服务的安装请求会首先被发送到 master 节点的 apiServer 组件；
3. apiServer 组件会调用 scheduler 组件来决定到底应该把这个服务安装到哪个 node 节点上，在此时，它会从 etcd 中读取各个 node 节点的信息，然后按照一定的算法进行选择，并将结果告知 apiServer；
4. apiServer 调用 controller-manager 去调度 Node 节点安装 nginx 服务；
5. kubelet 接收到指令后，会通知 docker，然后由 docker 来启动一个 nginx 的 pod，pod 是 kubernetes 的最小操作单元，容器必须跑在 pod 中；
6. 当Pod启动后，一个 nginx 服务就运行了，如果需要访问 nginx，就需要通过 kube-proxy 来对 pod 产生访问的代理
这样，外界用户就可以访问集群中的 nginx 服务了