@props([
    'label' => '',
    'name' => '',
    'model' => '',
    'options' => [],
    'valueField' => 'value', // key to use for option value
    'labelField' => 'label', // key to use for display text
    'placeholder' => '-- Select --',
    'required' => false,
])

<div class="mb-5">
    <label for="{{ $name }}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ $label }}
    </label>
    <select id="{{ $name }}" name="{{ $name }}" wire:model="{{ $model }}"
        {{ $required ? 'required' : '' }}
        {{ $attributes->merge(['class' => 'block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500']) }}>
        <option value="">{{ $placeholder }}</option>
        @foreach ($options as $option)
            <option value="{{ $option[$valueField] }}">
                {{ $option[$labelField] }}
            </option>
        @endforeach
    </select>
</div>
