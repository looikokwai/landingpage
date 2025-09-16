# 🚀 Laravel Lucky Wheel - 启动指南

## 📋 系统启动清单

### ✅ **第一步：启动队列处理器 (必须)**
```bash
php artisan queue:work
```
**说明**: 这个命令必须一直运行，它负责处理同步任务。如果停止了，系统就不会处理任何数据。

### ✅ **第二步：启动调度器 (必须)**

#### **开发环境 (本地测试)**
```bash
php artisan schedule:run
```
**说明**: 手动触发一次调度，用于测试。

#### **生产环境 (服务器)**
在服务器的 Cron Job 中添加：
```bash
* * * * * cd /path/to/your/project && php artisan schedule:run >> /dev/null 2>&1
```
**说明**: 每分钟自动运行调度器。

---

## 🔧 验证系统是否正常工作

### 检查同步任务
```bash
php artisan transactions:sync-recent
```

### 查看日志
```bash
tail -f storage/logs/laravel.log
```

---

## ⚠️ 重要提醒

1. **队列处理器必须一直运行** - 如果 `queue:work` 停止，系统就不工作了
2. **检查数据库配置** - 确保 `websites` 表中有激活的网站 (`status = 'active'`)
3. **API 配置** - 确保 `websites.url` 字段包含正确的 API 基础 URL

---

## 🚨 故障排除

### 如果没有数据同步：
1. 检查 `queue:work` 是否在运行
2. 查看 `storage/logs/laravel.log` 的错误信息
3. 确认数据库中有激活的网站记录

### 如果出现 API 错误：
1. 检查 `websites` 表中的 `url`, `access_id`, `access_token` 是否正确
2. 确认 API 服务器是否可访问

---

## 📊 系统工作流程

```
每分钟调度器触发
    ↓
为每个激活网站创建任务
    ↓
队列处理器执行任务
    ↓
调用 API 获取交易数据
    ↓
同步玩家和交易到数据库
    ↓
为 DEPOSIT 类型交易派发积分
```

---

**记住：`queue:work` + `schedule:run` = 系统正常运行** ✅
