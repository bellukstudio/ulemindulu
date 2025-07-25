<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Ulemindulu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="sample/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/frontend/app.jsx'])
</head>

<body>
    <div id="root"></div>
    @if (env('APP_ENV') == 'local' || env('APP_ENV') == 'development')
        <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="{{ config('app.midtrans.clientKey') }}">
        </script>
    @endif
</body>

</html>
