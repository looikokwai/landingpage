<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet API 测试页面</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .content {
            padding: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }

        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e1e1e1;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #4CAF50;
        }

        .btn {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
            width: 100%;
            margin-bottom: 20px;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .response-container {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
        }

        .response-container h3 {
            margin-bottom: 15px;
            color: #333;
        }

        .response-content {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
            overflow-x: auto;
        }

        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }

        .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4CAF50;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error {
            background: #fee;
            border-left-color: #f56565;
            color: #c53030;
        }

        .success {
            background: #f0fff4;
            border-left-color: #48bb78;
            color: #2f855a;
        }

        .info-box {
            background: #e6f3ff;
            border: 1px solid #bee3f8;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .info-box h4 {
            color: #2b6cb0;
            margin-bottom: 10px;
        }

        .info-box p {
            color: #2d3748;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 Wallet API 测试</h1>
            <p>获取游戏提供商列表</p>
        </div>

        <div class="content">
            <div class="info-box">
                <h4>📋 使用说明</h4>
                <p>请填写您的 API 认证信息，然后点击"获取游戏提供商"按钮来测试 API 接口。</p>
            </div>

            <form id="apiTestForm">
                <div class="form-group">
                    <label for="baseUrl">🌐 API 基础地址</label>
                    <input type="url" id="baseUrl" name="baseUrl" value="https://fly99.as6868.com" placeholder="https://fly99.as6868.com" required>
                </div>

                <div class="form-group">
                    <label for="accessId">🔑 Access ID</label>
                    <input type="text" id="accessId" name="accessId" value="338713893" placeholder="请输入您的 Access ID" required>
                </div>

                <div class="form-group">
                    <label for="accessToken">🎫 Access Token</label>
                    <input type="text" id="accessToken" name="accessToken" value="your-access-token" placeholder="请输入您的 Access Token" required>
                </div>

                <button type="submit" class="btn" id="testBtn">
                    🚀 获取游戏提供商
                </button>
            </form>

            <div class="loading" id="loading">
                <div class="loading-spinner"></div>
                <p>正在获取数据...</p>
            </div>

            <div class="response-container" id="responseContainer" style="display: none;">
                <h3>📊 API 响应结果</h3>
                <div class="response-content" id="responseContent"></div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('apiTestForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const testBtn = document.getElementById('testBtn');
            const loading = document.getElementById('loading');
            const responseContainer = document.getElementById('responseContainer');
            const responseContent = document.getElementById('responseContent');

            // 获取表单数据
            const baseUrl = document.getElementById('baseUrl').value.trim();
            const accessId = document.getElementById('accessId').value.trim();
            const accessToken = document.getElementById('accessToken').value.trim();

            // 验证输入
            if (!baseUrl || !accessId || !accessToken) {
                alert('请填写完整的认证信息！');
                return;
            }

            // 显示加载状态
            testBtn.disabled = true;
            testBtn.textContent = '⏳ 请求中...';
            loading.style.display = 'block';
            responseContainer.style.display = 'none';

            try {
                // 准备请求数据
                const formData = new FormData();
                formData.append('module', '/transactions/getAllTransactions');
                formData.append('accessId', accessId);
                formData.append('accessToken', accessToken);

                // 发送请求
                const response = await fetch(baseUrl + '/api/v1/index.php', {
                    method: 'POST',
                    body: formData
                });

                // 获取响应数据
                const data = await response.text();
                let jsonData;

                try {
                    jsonData = JSON.parse(data);
                } catch (e) {
                    jsonData = { error: 'Response is not valid JSON', rawResponse: data };
                }

                // 显示结果
                responseContent.textContent = JSON.stringify(jsonData, null, 2);
                responseContainer.style.display = 'block';
                responseContainer.className = response.ok ? 'response-container success' : 'response-container error';

                // 滚动到结果区域
                responseContainer.scrollIntoView({ behavior: 'smooth' });

            } catch (error) {
                // 处理错误
                responseContent.textContent = JSON.stringify({
                    error: '请求失败',
                    message: error.message,
                    timestamp: new Date().toISOString()
                }, null, 2);
                responseContainer.style.display = 'block';
                responseContainer.className = 'response-container error';
            } finally {
                // 恢复按钮状态
                testBtn.disabled = false;
                testBtn.textContent = '🚀 获取游戏提供商';
                loading.style.display = 'none';
            }
        });

        // 页面加载完成后的提示
        window.addEventListener('load', function() {
            console.log('🎮 Wallet API 测试页面已加载完成！');
            console.log('📝 请确保您有正确的 API 认证信息');
        });
    </script>
</body>
</html>
