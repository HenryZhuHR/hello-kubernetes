---
outline: deep
---

## Kubernetes Pod


### 一个简单的 Hello World

Pod 是我们将要创建的第一个 k8s 资源，也是可以在 Kubernetes 中创建和管理的、最小的可部署的计算单元。在了解 `pod` 和 `container` 的区别之前，我们可以先创建一个简单的 pod 试试，

创建一个 `nginx.yaml` 文件，内容如下：

<<< @/../kubernetes/nginx.yaml

<<< @/../kubernetes/nginx.yaml


通过执行 `kubectl apply` 命令来创建 Pod，接着通过 `kubectl get pods` 来查看 pod 是否正常启动，最后通过 `kubectl port-forward` 命令将 pod 默认的 `80` 端口映射到本机的 `4000` 端口，通过「浏览器」或「打开终端窗使用口 curl 」访问 `localhost:4000`

```shell
kubectl apply -f nginx.yaml # 创建 Pod
# pod/nginx-pod created

kubectl get pods    # 查看 Pod 状态，此时可能还在创建中
# NAME        READY   STATUS              RESTARTS   AGE
# nginx-pod   0/1     ContainerCreating   0          4s

kubectl get pods    # 查看 Pod 状态，创建完成
# NAME        READY   STATUS    RESTARTS   AGE
# nginx-pod   1/1     Running   0          62s

kubectl port-forward nginx-pod 4000:80  # 将 Pod 的 80 端口映射到本地的 4000 端口
# Forwarding from 127.0.0.1:4000 -> 80
# Forwarding from [::1]:4000 -> 80
```

可以通过 `kubectl exec -it` 命令进入 Pod 内容器的终端，并配置 nginx 的默认页面，最后通过「浏览器」或「打开终端窗使用口 curl 」访问 `localhost:4000`

```shell
kubectl exec -it nginx-pod -- /bin/bash
# kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
```

```shell
# 容器内终端
# root@nginx-pod:/#
echo "hello kubernetes by nginx!" > /usr/share/nginx/html/index.html
kubectl port-forward nginx-pod 4000:80
exit
```


### 操作 Pod 命令

#### 创建 Pod

```shell
kubectl apply -f <pod-file>
```

#### 查看 Pod

```shell
kubectl get pods
```

查看 Pod 详细信息
```shell
kubectl describe pod <pod-name>
```

#### 进入 Pod

```shell
kubectl exec -it <pod-name> -- /bin/bash
```
`--` 后面的命令会在容器内执行，可以使用 `bash` 或者 `sh` 进入容器内部。

#### 日志

查看 Pod 日志
```shell
kubectl logs <pod-name>
kubectl logs -f <pod-name> # -f --follow 跟踪日志
```

#### 删除 Pod

```shell
kubectl delete pod <pod-name>
kubectl delete -f <pod-file>
```


### 应用

#### 连接到 Pod 内的数据库