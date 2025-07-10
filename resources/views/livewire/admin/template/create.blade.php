<div class="p-6">
    <div class="card bg-white rounded-lg shadow-lg w-full p-10">
        <form wire:submit.prevent="create" class="w-full" enctype="multipart/form-data">
            <x-form.input-floating label="Template Name" name="templateName" model="templateName" required />

            <x-form.textarea label="Description" name="description" model="description" rows="4" />

            <x-form.input-floating label="Folder" name="folderPath" model="folderPath" required />

            <x-form.select label="Invitation Type" name="type" model="type" :options="$types" />

            <x-form.input-floating label="Price" name="price" type="number" model="price" required min="0"
                step="0.01" />

            <x-form.checkbox label="Is Discount? (Optional)" name="isDiscount" model="isDiscount" />

            <!-- Thumbnail Upload Section -->
            <div class="mb-4">
                <label for="thumbnail" class="block text-sm font-medium text-gray-700 mb-2">
                    Upload Thumbnail <span class="text-red-500">*</span>
                </label>
                <input type="file" id="thumbnail" wire:model="thumbnail" accept="image/*"
                    class="mt-1 block w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">

                <!-- Show Upload Progress -->
                <div wire:loading wire:target="thumbnail" class="text-sm text-blue-500 mt-2 flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Uploading image...
                </div>

                <!-- Show Thumbnail Preview -->
                @if ($uploadedUrl)
                    <div class="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div class="flex items-center justify-between mb-2">
                            <label class="text-sm font-medium text-green-800">Thumbnail Preview</label>
                            <button type="button" wire:click="removeThumbnail"
                                class="text-red-500 hover:text-red-700 text-sm font-medium">
                                × Remove
                            </button>
                        </div>
                        <img src="{{ $uploadedUrl }}" alt="Thumbnail preview"
                            class="w-32 h-32 object-cover rounded-lg border shadow-sm">
                        <p class="text-xs text-green-600 mt-2">Image uploaded successfully!</p>
                    </div>
                @endif

                @error('thumbnail')
                    <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                @enderror
            </div>

            @if ($isDiscount)
                <x-form.input-floating label="Price Discount" name="priceDiscount" type="number" model="priceDiscount"
                    required min="0" step="0.01" />
            @endif

            <!-- Success/Error Messages -->
            @if (session()->has('message'))
                <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-green-800">{{ session('message') }}</p>
                        </div>
                    </div>
                </div>
            @endif

            @error('error')
                <div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-red-800">{{ $message }}</p>
                        </div>
                    </div>
                </div>
            @enderror

            <div class="flex justify-end space-x-4">
                <a href="{{ route('templates.index') }}"
                    class="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors">
                    Cancel
                </a>

                <button type="submit"
                    class="w-[350px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
                    wire:loading.attr="disabled" wire:target="create">
                    <span wire:loading.remove wire:target="create">Create Template</span>
                    <span wire:loading wire:target="create" class="inline-flex items-center justify-center">

                        <div class="flex flex-row place-self-center">
                            <svg class="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10"
                                    stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>Creating...</span>
                        </div>
                    </span>
                </button>
            </div>
        </form>
    </div>
</div>
