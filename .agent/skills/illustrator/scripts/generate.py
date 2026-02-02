import os
import sys
import argparse
from pathlib import Path

try:
    from dotenv import load_dotenv
    from google import genai
    from google.genai import types
except ImportError:
    print("Dependencies missing. Install with: pip install python-dotenv google-genai")
    sys.exit(1)

# Load API keys from project root .env
load_dotenv(os.path.join(os.getcwd(), '.env'))

def generate_illustration(prompt: str, output_path: str, aspect_ratio: str = "1:1"):
    """
    Calls Google Imagen 4.0 API using google-genai client.
    Supported ratios: 1:1, 9:16, 16:9, 4:3, 3:4
    """
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("IMAGE_GEN_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in .env file.")
        return

    client = genai.Client(api_key=api_key)

    print(f"Generating image with prompt: {prompt}")
    print(f"Aspect Ratio: {aspect_ratio}")

    try:
        # Using types.GenerateImagesConfig as per official Google AI Studio / Colab examples
        result = client.models.generate_images(
            model="models/imagen-4.0-generate-001",
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                output_mime_type="image/jpeg",
                aspect_ratio=aspect_ratio,
                image_size="1K",
            ),
        )

        if not result.generated_images:
            print("No images generated.")
            return

        # Ensure directory exists
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        # Save the first image
        result.generated_images[0].image.save(str(output_file))
        print(f"Successfully saved illustration to {output_path}")

    except Exception as e:
        print(f"An error occurred during generation: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Brand Illustrator Generation Script (Google Imagen 4.0)")
    parser.add_argument("--prompt", required=True, help="The full aesthetic prompt")
    parser.add_argument("--output", default="assets/illustration_output.jpg", help="Path to save the image")
    parser.add_argument("--aspect_ratio", default="1:1", help="Aspect ratio (1:1, 9:16, 16:9, 4:3, 3:4)")
    
    args = parser.parse_args()
    generate_illustration(args.prompt, args.output, args.aspect_ratio)
