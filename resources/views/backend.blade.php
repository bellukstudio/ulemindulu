<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/js/backend/app.js')

    @livewireStyles
    <title>Admin Panel</title>
</head>

<body>
    <h2>Admin Panel</h2>
    <livewire:admin.dashboard />
    @livewireScripts
</body>

</html>
