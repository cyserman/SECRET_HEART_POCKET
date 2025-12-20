#!/bin/bash

# Asset Management Script for Secret Heart Pocket
# Quick utilities for managing visual assets

set -e

ASSETS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

show_usage() {
    echo "Asset Management Script"
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  list                    - List all assets with sizes"
    echo "  organize <file> <type>  - Move file to appropriate folder"
    echo "  screenshot <desc>       - Take screenshot with timestamp"
    echo "  clean-temp              - Clean temporary uploads folder"
    echo "  stats                   - Show asset statistics"
    echo ""
    echo "Types: ui, bugs, features, mockups, designs, inspiration, documentation"
    echo ""
    echo "Examples:"
    echo "  $0 list"
    echo "  $0 organize myfile.png ui"
    echo "  $0 screenshot 'login screen'"
    echo "  $0 clean-temp"
}

list_assets() {
    echo "=== Assets Overview ==="
    echo ""
    find "$ASSETS_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" | while read -r file; do
        size=$(du -h "$file" | cut -f1)
        echo "$size $(realpath --relative-to="$ASSETS_DIR/.." "$file")"
    done | sort -h
}

organize_file() {
    file="$1"
    type="$2"

    if [ ! -f "$file" ]; then
        echo "Error: File '$file' not found"
        exit 1
    fi

    case "$type" in
        ui|bugs|features|mockups)
            dest="$ASSETS_DIR/screenshots/$type/"
            ;;
        designs|inspiration|documentation)
            dest="$ASSETS_DIR/references/$type/"
            ;;
        *)
            echo "Error: Invalid type '$type'"
            echo "Valid types: ui, bugs, features, mockups, designs, inspiration, documentation"
            exit 1
            ;;
    esac

    # Create timestamped filename
    ext="${file##*.}"
    desc=$(basename "$file" ".$ext" | sed 's/[^a-zA-Z0-9]/-/g')
    timestamp=$(date +%Y-%m-%d)
    newname="${timestamp}_${desc}.${ext}"

    mv "$file" "$dest$newname"
    echo "Moved to: $dest$newname"
}

take_screenshot() {
    desc="$1"
    if [ -z "$desc" ]; then
        echo "Error: Please provide a description"
        exit 1
    fi

    # Sanitize description for filename
    clean_desc=$(echo "$desc" | sed 's/[^a-zA-Z0-9 ]//g' | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]')
    filename="$(date +%Y-%m-%d)_${clean_desc}.png"

    echo "Taking screenshot..."
    echo "Save as: $ASSETS_DIR/screenshots/ui/$filename"
    echo ""
    echo "On Linux, you can use:"
    echo "  flameshot gui  # then save to the path above"
    echo "  scrot -s '$ASSETS_DIR/screenshots/ui/$filename'"
    echo "  gnome-screenshot -a -f '$ASSETS_DIR/screenshots/ui/$filename'"
}

clean_temp() {
    temp_dir="$ASSETS_DIR/uploads/temp"
    if [ -d "$temp_dir" ]; then
        count=$(find "$temp_dir" -type f | wc -l)
        if [ "$count" -gt 0 ]; then
            echo "Cleaning $count files from temp directory..."
            find "$temp_dir" -type f -delete
            echo "Temp directory cleaned."
        else
            echo "Temp directory is already clean."
        fi
    fi
}

show_stats() {
    echo "=== Asset Statistics ==="
    echo ""
    echo "By folder:"
    find "$ASSETS_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" \) | \
        sed "s|$ASSETS_DIR/||" | \
        awk -F'/' '{folder=$1"/"$2; count[folder]++; total++} END {for (f in count) printf "%-25s %d files\n", f, count[f]; print ""; printf "Total files: %d\n", total}'

    echo ""
    echo "By type:"
    find "$ASSETS_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" \) | \
        awk -F'.' '{ext=$NF; count[ext]++; total++} END {for (e in count) printf "%-10s %d files\n", "."e, count[e]; print ""; printf "Total files: %d\n", total}'

    echo ""
    echo "Total size:"
    du -sh "$ASSETS_DIR"/* 2>/dev/null | sort -h
}

case "${1:-help}" in
    list)
        list_assets
        ;;
    organize)
        if [ $# -ne 3 ]; then
            echo "Usage: $0 organize <file> <type>"
            exit 1
        fi
        organize_file "$2" "$3"
        ;;
    screenshot)
        take_screenshot "$2"
        ;;
    clean-temp)
        clean_temp
        ;;
    stats)
        show_stats
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        echo "Unknown command: $1"
        echo ""
        show_usage
        exit 1
        ;;
esac
