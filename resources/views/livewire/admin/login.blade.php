    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
        <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form action="" wire:submit.prevent="login">
            <div class="mb-4">
                <label class="block text-gray-700">Email</label>
                <input type="email" wire:model.defer="email"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 @error('email') invalid @enderror">
                @error('email')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-4">
                <label class="block text-gray-700">Password</label>
                <input type="password" wire:model.defer="password"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500
                    @error('password') invalid @enderror">
                @error('password')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>


            <button type="submit" class="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-600">
                Login
            </button>
        </form>

        <p class="mt-4 text-center text-gray-600">
            Don't have an account? <a href="" class="text-red-600">Register</a>
        </p>
    </div>
