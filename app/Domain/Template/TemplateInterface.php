<?php

namespace App\Domain\Template;

use App\Models\Order\InvitationTemplate;

interface TemplateInterface
{
    public function all(string $search): mixed;
    public function create(array $data) : InvitationTemplate;
    public function update(InvitationTemplate $template, array $data) : bool;
    public function delete(InvitationTemplate $template) : bool;
    public function findById($id): InvitationTemplate;

    // api
    public function allApi(string $search, int $perPage): mixed;
    public function showApi($id);
}
