@props([
    'label' => '',
    'name' => '',
    'rows' => 4,
    'model' => '',
])

<div class="mb-4">
    <label for="{{ $name }}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ $label }}
    </label>
    <textarea id="{{ $name }}" name="{{ $name }}" rows="{{ $rows }}" wire:model="{{ $model }}"
        {{ $attributes->merge(['class' => 'block p-2.5 w-full h-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white']) }}>
    </textarea>
</div>
