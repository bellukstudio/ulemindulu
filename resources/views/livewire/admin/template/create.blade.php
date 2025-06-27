<div class="p-6">
    <div class="card bg-white rounded-lg shadow-lg w-full p-10">
        <form wire:submit.prevent="create" class="w-full">
            <x-form.input-floating label="Template Name" name="templateName" model="templateName" required />

            <x-form.textarea label="Description" name="description" model="description" rows="4" />

            <x-form.input-floating label="Slug" name="slug" model="slug" required />

            <!-- Perbaiki model binding -->
            <x-form.input-floating label="Url" name="previewUrl" model="previewUrl" required />

            <x-form.input-floating label="Folder" name="folderPath" model="folderPath" required />

            <x-form.select label="Invitation Type" name="type" model="type" :options="$types" />

            <x-form.input-floating label="Price" name="price" type="number" model="price" required min="0"
                step="0.01" />

            <x-form.checkbox label="Is Discount? (Optional)" name="isDiscount" model="isDiscount" />

            @if ($isDiscount)
                <x-form.input-floating label="Price Discount" name="priceDiscount" type="number" model="priceDiscount"
                    required min="0" step="0.01" />
            @endif

            <div class="flex justify-end">
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create Template
                </button>
                <a href="{{ route('templates.index') }}"
                    class="text-white ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Back
                </a>
            </div>
        </form>
    </div>
</div>
