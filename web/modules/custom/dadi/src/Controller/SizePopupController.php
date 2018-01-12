<?php

namespace Drupal\dadi\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenDialogCommand;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Controller\ControllerBase;

/**
 * Class SizePopupController.
 */
class SizePopupController extends ControllerBase {

  /**
   * Openpopup.
   *
   * @return string
   *
   */
  public function openPopup() {
    $response = new AjaxResponse();

    $title = $this->t('Size information');
    $content = '';
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();

    $nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties(['field_special' => 'sizes_for_clothes', 'langcode' => $language]);
    foreach ($nodes as $node){
      $content .= $node->get('body')->getValue()[0]['value'];
    }

    $response->addCommand(new OpenDialogCommand('#myclass', $title, $content, ['width' => 750]));
    return $response;
  }

  /**
   * @return \Drupal\Core\Ajax\AjaxResponse
   */
  public function popupWithShoesSizes(){
    $response = new AjaxResponse();

    $title = $this->t('Size information');
    $content = '';
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();

    $nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties(['field_special' => 'sizes_for_shoes', 'langcode' => $language]);
    foreach ($nodes as $node){
      $content .= $node->get('body')->getValue()[0]['value'];
    }

    $response->addCommand(new OpenDialogCommand('#myclass', $title, $content, ['width' => 750]));
    return $response;
  }

}
