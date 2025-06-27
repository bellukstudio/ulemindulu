<div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form wire:submit.prevent="login">
            <div class="mb-4">
                <label class="block text-gray-700">Email</label>
                <input type="email" wire:model.defer="email"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 @error('email') border-red-500 @enderror">
                @error('email')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-6">
                <label class="block text-gray-700">Password</label>
                <input type="password" wire:model.defer="password"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 @error('password') border-red-500 @enderror">
                @error('password')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <button type="submit"
                class="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-700 transition duration-200">
                Login
            </button>
        </form>

        <p class="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <a href="#" class="text-red-600 hover:underline">Register</a>
        </p>
    </div>
</div>
