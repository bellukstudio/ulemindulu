<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>

<body class="min-h-screen flex items-center justify-center bg-gray-100">
    <main class="w-full">
        {{ $slot }}
    </main>

    @livewireScripts
</body>

</html>
