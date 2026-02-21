<?php
/**
 * Validate Admin Token
 */

function validateAdminToken() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (strpos($authHeader, 'Bearer ') === 0) {
        $token = substr($authHeader, 7);
        $adminPassword = getenv('ADMIN_PASSWORD');
        if (!$adminPassword) return false;
        
        $expectedToken = hash('sha256', $adminPassword . 'abhiyantran_admin_secret_salt_2025');
        return hash_equals($expectedToken, $token);
    }
    return false;
}
