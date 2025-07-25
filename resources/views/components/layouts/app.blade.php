<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @livewireStyles
    <title>Admin Panel</title>
</head>
<body>
    @include('components.layouts.sidebar')

    <div class="p-4 sm:ml-64">
        {{ $slot }}
    </div>

    @livewireScripts

    <!-- Load scripts in order -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Add a small script to verify Chart.js loaded -->
    <script>
        if (typeof Chart !== 'undefined') {
            console.log('✅ Chart.js version:', Chart.version);
        } else {
            console.error('❌ Chart.js failed to load');
        }
    </script>

    @stack('scripts')
</body>
</html>
