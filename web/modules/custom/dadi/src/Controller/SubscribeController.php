<?php

namespace Drupal\dadi\Controller;

use Drupal\simplenews\Entity\Newsletter;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Controller\ControllerBase;

/**
 * Class PopupController
 *
 * @package Drupal\dadi\Controller
 */
class SubscribeController extends ControllerBase {

  /**
   * When user don't want to subscribe to newsletter
   */
  public function resetSubscribe(){
    $previousUrl= \Drupal::request()->server->get('HTTP_REFERER');
    return new \Symfony\Component\HttpFoundation\RedirectResponse($previousUrl);
  }

  /**
   * When user don't want to subscribe to newsletter
   */
  public function submitSubscribe($email){

    $subscription_manager = \Drupal::service('simplenews.subscription_manager');
    $newsletter = Newsletter::load('default');
    $subscription_manager->subscribe($email, $newsletter->id, NULL, 'website');
    $sent = $subscription_manager->sendConfirmations();
    
    $previousUrl= \Drupal::request()->server->get('HTTP_REFERER');
    return new \Symfony\Component\HttpFoundation\RedirectResponse($previousUrl);
  }
}

